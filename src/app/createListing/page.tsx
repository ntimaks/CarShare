import CarListingForm from "@/components/pageComponents/createListing/CarForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreateListing() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <CarListingForm />
        </div>
    )
}