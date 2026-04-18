import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Stripe webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          provider: "stripe",
          status: "active",
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          current_period_end: new Date(
            subscription.current_period_end * 1000,
          ).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId =
        typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription?.id;

      if (subscriptionId) {
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            current_period_end: new Date(
              subscription.current_period_end * 1000,
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
