"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { toast } from "react-hot-toast";

export async function login(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        toast.error("Login failed. Please try again.");
        redirect("/error");
        return;
    }

    revalidatePath("/", "layout");
    cookieStore.set("fresh_login", "true", {
        maxAge: 5,
        path: "/"
    });

    toast.success("Login successful!");
    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: `${firstName + " " + lastName}`,
                email: formData.get("email") as string,
            },
        },
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        toast.error("Signup failed. Please try again.");
        redirect("/error");
    } else {
        revalidatePath("/", "layout");
        toast.success("Signup successful!");
        redirect("/");
    }
}

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        toast.error("Sign out failed. Please try again.");
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
        toast.error("Google sign-in failed. Please try again.");
        console.log(error);
        redirect("/error");
    } else {
        toast.success("Redirecting to Google for authentication.");
        redirect(data.url);
    }
}
