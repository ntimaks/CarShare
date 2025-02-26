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

        if (!firstName || !lastName || !email || !password) {
            console.error('Missing required fields:', { firstName, lastName, email, hasPassword: !!password });
            return redirect("/error");
        }

        console.log('Starting signup process...');

        // Create Stripe Connect account
        console.log('Creating Stripe account...');
        const account = await stripe.accounts.create({
            type: 'express',
            email,
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
        console.log('Stripe account created:', account.id);

        // Create Supabase user
        console.log('Creating Supabase user...');
        const { data, error: supabaseError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
                data: {
                    full_name: `${firstName} ${lastName}`,
                    email,
                    connected_account_id: account.id
                }
            }
        });

        if (supabaseError) {
            console.error('Supabase signup error:', supabaseError);
            console.log('Cleaning up Stripe account...');
            await stripe.accounts.del(account.id);
            return redirect("/error");
        }

        console.log('Supabase signup successful:', data);
        revalidatePath("/", "layout");
        return redirect("/signup/confirmEmail");

    } catch (error: any) {
        if (!error.digest?.includes('NEXT_REDIRECT')) {
            console.error("Signup process error:", error);
            return redirect("/error");
        }
        throw error;
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
