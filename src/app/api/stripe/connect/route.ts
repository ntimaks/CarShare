import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        console.log('Webhook endpoint hit');
        const body = await req.text();
        const signature = (await headers()).get("stripe-signature") as string;

        console.log('Webhook secret:', process.env.STRIPE_WEBHOOK_SECRET ? 'present' : 'missing');
        console.log('Signature:', signature ? 'present' : 'missing');

        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
            console.log('Webhook event constructed successfully:', event.type);
        } catch (err: unknown) {
            console.error('Error constructing webhook event:', err);
            if (err instanceof Error) {
                return new Response(`Webhook Error: ${err.message}`, { status: 400 });
            }
            return new Response('Webhook Error: Unknown error occurred', { status: 400 });
        }

        // Handle multiple event types
        switch (event.type) {
            case "account.updated":
                const account = event.data.object;
                console.log('Account update event received:', account);

                // Only proceed if charges are enabled (account is fully set up)
                if (account.charges_enabled) {
                    const supabase = createClient();
                    console.log('Supabase client created');

                    // Get the user ID from the account email
                    const { data: userData, error: userError } = await (await supabase)
                        .from('profiles')
                        .select('id')
                        .eq('email', account.email)
                        .single();

                    if (userError) {
                        console.error('Error finding user:', userError);
                        return new Response('User not found', { status: 404 });
                    }

                    const { error: updateError } = await (await supabase)
                        .from('profiles')
                        .update({
                            stripe_connected_linked: true,
                        })
                        .eq('id', userData.id);

                    if (updateError) {
                        console.error('Supabase update error:', updateError);
                        throw updateError;
                    }
                    console.log('Profile updated successfully');
                } else {
                    console.log('Account not fully set up yet, skipping update');
                }
                break;

            case "capability.updated":
            case "account.external_account.created":
            case "person.created":
            case "person.updated":
                // Just acknowledge these events
                console.log(`Received ${event.type} event, no action needed`);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response("Webhook processed successfully", { status: 200 });
    } catch (error: unknown) {
        console.error('Webhook processing error:', error);
        if (error instanceof Error) {
            return new Response(`Webhook Error: ${error.message}`, { status: 500 });
        }
        return new Response('Webhook Error: Unknown error occurred', { status: 500 });
    }
}