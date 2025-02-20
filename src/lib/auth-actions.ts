"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
        redirect("/error");
    } else {
        revalidatePath("/", "layout");
        redirect("/");
    }
}

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        redirect("/error");
    } else {
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
