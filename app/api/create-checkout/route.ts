import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider } = await request.json();

    if (provider === "stripe") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.email,
        metadata: { user_id: user.id },
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID!,
            quantity: 1,
          },
        ],
        success_url: `${request.headers.get("origin") || "https://japanese-trainer-repo.vercel.app"}/pricing?success=true`,
        cancel_url: `${request.headers.get("origin") || "https://japanese-trainer-repo.vercel.app"}/pricing?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (provider === "liqpay") {
      const crypto = await import("crypto");
      const orderId = `liqpay_${user.id}_${Date.now()}`;

      const params = {
        public_key: process.env.LIQPAY_PUBLIC_KEY!,
        version: "3",
        action: "subscribe",
        amount: "1",
        currency: "USD",
        description: "Japanese Trainer — подписка $1/мес",
        order_id: orderId,
        subscribe: "1",
        subscribe_date_start: new Date().toISOString().split("T")[0],
        subscribe_periodicity: "month",
        result_url: `${request.headers.get("origin") || "https://japanese-trainer-repo.vercel.app"}/pricing?success=true`,
        server_url: `${request.headers.get("origin") || "https://japanese-trainer-repo.vercel.app"}/api/webhooks/liqpay`,
      };

      const data = Buffer.from(JSON.stringify(params)).toString("base64");
      const signature = crypto
        .createHash("sha1")
        .update(process.env.LIQPAY_PRIVATE_KEY! + data + process.env.LIQPAY_PRIVATE_KEY!)
        .digest("base64");

      return NextResponse.json({ data, signature });
    }

    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
