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
        let account;
        try {
            account = await stripe.accounts.create({
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
        } catch (stripeError) {
            console.error('Error creating Stripe account:', stripeError);
            return redirect("/error");
        }

        // Create Supabase user
        console.log('Creating Supabase user...');
        const { data, error: supabaseError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
                data: {
                    full_name: `${firstName} ${lastName}`,
                    email
                }
            }
        });

        if (!supabaseError && data.user) {
            // check if profile exists
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select()
                .eq('id', data.user.id)
                .single();

            if (existingProfile) {
                // Update existing profile
                const { error: _profileError } = await supabase
                    .from('profiles')
                    .update({
                        full_name: `${firstName} ${lastName}`,
                        email: email,
                        connected_account_id: account.id
                    })
                    .eq('id', data.user.id);
            } else {
                // Insert new profile
                const { error: _profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        full_name: `${firstName} ${lastName}`,
                        email: email,
                        connected_account_id: account.id
                    });
            }


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
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/google-callback`,
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    } else {
        redirect(data.url);
    }
}

export async function handleGoogleCallback() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error('No user found after Google authentication');
        return redirect("/error");
    }

    try {
        // Check if user already has a Stripe account
        const { data: profile } = await supabase
            .from('profiles')
            .select('connected_account_id')
            .eq('id', user.id)
            .single();

        // Only create Stripe account if user doesn't have one already
        if (!profile?.connected_account_id) {
            const firstName = user.user_metadata.full_name?.split(' ')[0] || '';
            const lastName = user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '';
            const email = user.email;

            console.log('Creating Stripe account for Google user...');

            // Create Stripe Connect account
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

            // Update user profile with Stripe account ID
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: user.user_metadata.full_name,
                    email: email,
                    connected_account_id: account.id
                });

            if (profileError) {
                console.error('Error updating profile with Stripe account:', profileError);
                return redirect("/error");
            }
        }

        revalidatePath("/", "layout");
        return redirect("/");

    } catch (error: any) {
        console.error("Google auth callback error:", error);
        return redirect("/error");
    }
}
