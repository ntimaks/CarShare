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

        // Create Stripe Connect account first
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

        // If Stripe account created successfully, create Supabase user
        const { error } = await supabase.auth.signUp({
            email: email,
            password: formData.get("password") as string,
            options: {
                data: {
                    full_name: `${firstName} ${lastName}`,
                    email: email,
                    connected_account_id: account.id,
                }
            }
        });

        if (error) {
            // If Supabase error, clean up the Stripe account
            await stripe.accounts.del(account.id);
            redirect("/error");
        } else {
            revalidatePath("/", "layout");
            redirect("/signup/confirmEmail");
        }
    } catch (error) {
        console.error("Signup error:", error);
        redirect("/error");
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
