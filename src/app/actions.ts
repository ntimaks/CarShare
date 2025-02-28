"use server";

import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function BuyProduct(formData: FormData) {
    const rawId = formData.get('id');
    console.log('Raw ID from form:', rawId);
    const id = parseInt(rawId as string);

    if (isNaN(id)) {
        console.error('Invalid ID format');
        return redirect('/error');
    }

    const totalPrice = Number(formData.get('totalPrice'));
    const supabase = await createClient();
    const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*, profiles(connected_account_id)')
        .eq('id', id)
        .single();

    const { data, error } = carData ? {
        data: {
            ...carData,
            connected_account_id: carData.profiles?.connected_account_id
        },
        error: null
    } : { data: null, error: carError };

    if (error) {
        console.error('Error fetching product:', error);
        return redirect('/error');
    }

    // Convert price to cents and ensure it's an integer
    const priceInCents = Math.round(totalPrice * 100);
    const applicationFeeAmount = Math.round(priceInCents * 0.1); // 10% fee

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: 'eur',
                unit_amount: priceInCents,
                product_data: {
                    name: `${data.make} ${data.model}`,
                    images: data.photos ? [data.photos[0]] : [],
                },
            },
            quantity: 1,
        }],
        payment_intent_data: {
            application_fee_amount: applicationFeeAmount,
            transfer_data: {
                destination: data.profiles?.connected_account_id,
            },
        },
        success_url: `https://car-share-lac.vercel.app/payment/success`,
        cancel_url: `https://car-share-lac.vercel.app/payment/cancel`,
    });

    return redirect(session.url as string);
}

export async function CreateStripeAccountLink() {
    const supabase = createClient()
    const { data: profile } = await (await supabase)
        .from('profiles')
        .select('connected_account_id')
        .eq('id', (await (await supabase).auth.getUser()).data.user?.id)
        .single()

    const accountLink = await stripe.accountLinks.create({
        account: profile?.connected_account_id as string,
        refresh_url: `https://car-share-lac.vercel.app/billing`,
        return_url: `https://car-share-lac.vercel.app/billing`,
        type: 'account_onboarding',
    })

    return redirect(accountLink.url)
}

export async function GetStripeDashboard() {
    const supabase = createClient()
    const { data: profile } = await (await supabase)
        .from('profiles')
        .select('connected_account_id')
        .eq('id', (await (await supabase).auth.getUser()).data.user?.id)
        .single()

    const loginLink = await stripe.accounts.createLoginLink(profile?.connected_account_id as string)

    return redirect(loginLink.url)
}

