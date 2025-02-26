"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { toast } from "react-hot-toast";
import { stripe } from "@/lib/stripe";

export async function login(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/error");
        return;
    }

    revalidatePath("/", "layout");
    cookieStore.set("fresh_login", "true", {
        maxAge: 5,
        path: "/"
    });

    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    try {
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log('=== Starting Signup Process ===');
        console.log('Form Data received:', { firstName, lastName, email });

        // Create Stripe Connect account first
        console.log('Creating Stripe Connect account...');
        const account = await stripe.accounts.create({
            type: 'express',
            email: email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            },
            business_type: 'individual',
            individual: {
                first_name: firstName,
                last_name: lastName,
            }
        });
        console.log('Stripe account created successfully:', account.id);

        // If Stripe account created successfully, create Supabase user
        console.log('Creating Supabase user...');
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: `${firstName} ${lastName}`,
                    email: email,
                    connected_account_id: account.id,
                }
            }
        });

        if (error) {
            console.error('Supabase signup error:', error);
            // If Supabase error, clean up the Stripe account
            console.log('Cleaning up Stripe account due to Supabase error...');
            await stripe.accounts.del(account.id);
            return redirect("/error");
        }

        console.log('Supabase user created successfully:', data);
        revalidatePath("/", "layout");
        return redirect("/signup/confirmEmail");

    } catch (error) {
        if ((error as any)?.digest?.includes('NEXT_REDIRECT')) {
            throw error; // Let Next.js handle the redirect
        }
        console.error("Signup process error:", error);
        return redirect("/error");
    }
}

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        redirect("/error");
    } else {
        toast.success("Successfully signed out.");
        redirect("/logout");
    }
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    } else {
        redirect(data.url);
    }
}
