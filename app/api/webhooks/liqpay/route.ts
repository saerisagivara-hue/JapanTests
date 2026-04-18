import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = formData.get("data") as string;
    const receivedSig = formData.get("signature") as string;

    if (!data || !receivedSig) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const privateKey = process.env.LIQPAY_PRIVATE_KEY!;
    const expectedSig = crypto
      .createHash("sha1")
      .update(privateKey + data + privateKey)
      .digest("base64");

    if (receivedSig !== expectedSig) {
      console.error("LiqPay signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

    if (
      decoded.status === "subscribed" ||
      decoded.status === "success"
    ) {
      const orderId: string = decoded.order_id || "";
      const parts = orderId.split("_");
      const userId = parts.length >= 2 ? parts[1] : null;

      if (!userId) {
        console.error("LiqPay: no user_id in order_id:", orderId);
        return NextResponse.json({ error: "Invalid order" }, { status: 400 });
      }

      const supabase = await createServiceClient();

      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          provider: "liqpay",
          status: "active",
          liqpay_order_id: orderId,
          current_period_end: periodEnd.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("LiqPay webhook error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
