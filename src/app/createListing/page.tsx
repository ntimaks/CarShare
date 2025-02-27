import CarListingForm from "@/components/pageComponents/createListing/CarForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

async function getData(userId: string) {
    const supabase = createClient()
    const { data: profile } = await (await supabase)
        .from('profiles')
        .select('stripe_connected_linked')
        .eq('id', userId)
        .single()

    if (!profile?.stripe_connected_linked) {
        toast.error("You must connect your Stripe account to create a listing");
        redirect("/billing");
    }

    return null
}

export default async function CreateListing() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        toast.error("You must be logged in to create a listing");
        redirect("/login");
    }

    await getData(user.id);
    return (
        <div className="container mx-auto px-4 py-8">
            <CarListingForm />
        </div>
    )
}