import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateStripeAccountLink, GetStripeDashboard } from "../actions";
import ConnectStripe from "@/components/pageComponents/billing/ConnectStripe";
import { Button } from "@/components/ui/button";
async function getData(userId: string) {
    const supabase = createClient()
    const { data: profile } = await (await supabase)
        .from('profiles')
        .select('connected_account_id, stripe_connected_linked')
        .eq('id', userId)
        .eq('stripe_connected_linked', true)
        .single()

    return profile
}

export default async function Billing() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()


    //Ja tu neesi user tad piss ara
    if (!user) {
        toast.error("Please log in to access billing.")
        redirect("/login")
    }

    const profile = await getData(user.id)
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>Manage your billing information</CardDescription>
                </CardHeader>
                <CardContent>
                    {profile?.stripe_connected_linked ? (
                        <form action={GetStripeDashboard}>
                            <Button>Go to Stripe Dashboard</Button>
                        </form>
                    ) : (
                        <form action={CreateStripeAccountLink}>
                            <ConnectStripe />
                        </form>
                    )}
                </CardContent>
            </Card>
        </section>
    )
}
