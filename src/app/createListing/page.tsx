import CarListingForm from "@/components/pageComponents/createListing/CarForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const supabase = createClient()
    const { data: profile } = await (await supabase)
        .from('profiles')
        .select('stripe_connected_linked')
        .eq('id', userId)
        .single()

    if (!profile?.stripe_connected_linked) {
        redirect("/billing");
    }

    return null
}

export default async function CreateListing() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    await getData(user.id);
    return (
        <div className="container mx-auto px-4 py-8">
            <CarListingForm />
        </div>
    )
}