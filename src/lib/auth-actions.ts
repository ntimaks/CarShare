"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { useToast } from "@/hooks/use-toast";


export async function login(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient();
    const toast = useToast(); // Assuming useToast is imported and can be used here

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        toast.toast({
            title: "Error",
            description: "Failed to log in. Please check your credentials.",
            variant: "destructive",
        });
        redirect("/error");
        return;
    }

    // Force a revalidation of the cache
    revalidatePath("/", "layout");

    // Set a cookie to indicate fresh login
    cookieStore.set("fresh_login", "true", {
        maxAge: 5, // Short lived cookie
        path: "/"
    });

    toast.toast({
        title: "Success",
        description: "Logged in successfully.",
        variant: "default",
    });

    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();
    const toast = useToast(); // Assuming useToast is imported and can be used here

    // type-casting here for convenience
    // in practice, you should validate your inputs
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
        toast.toast({
            title: "Error",
            description: "Failed to create account.",
            variant: "destructive",
        });
        redirect("/error");
    } else {
        toast.toast({
            title: "Success",
            description: "Account created successfully. Please check your email to verify your account.",
            variant: "default",
        });
        revalidatePath("/", "layout");
        redirect("/");
    }
}

export async function signout() {
    const supabase = await createClient();
    const toast = useToast(); // Assuming useToast is imported and can be used here
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        toast.toast({
            title: "Error",
            description: "Failed to sign out.",
            variant: "destructive",
        });
        redirect("/error");
    } else {
        toast.toast({
            title: "Success",
            description: "You have been signed out successfully.",
            variant: "default",
        });
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
    }

    redirect(data.url);
}
