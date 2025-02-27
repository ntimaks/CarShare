import CarListingForm from "@/components/pageComponents/createListing/CarForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
export default async function CreateListing() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        toast.error("You must be logged in to create a listing");
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <CarListingForm />
        </div>
    )
}