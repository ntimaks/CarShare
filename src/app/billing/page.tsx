import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { toast } from "react-hot-toast"
import { CreateStripeAccountLink, GetStripeDashboard } from "../actions"
import ConnectStripe from "@/components/pageComponents/billing/ConnectStripe"
import { CreditCard, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

async function getData(userId: string) {
  const supabase = createClient()
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("connected_account_id, stripe_connected_linked")
    .eq("id", userId)
    .eq("stripe_connected_linked", true)
    .single()

  return profile
}

export default async function Billing() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  // Redirect if not logged in
  if (!user) {
    toast.error("Please log in to access billing.")
    redirect("/login")
  }

  const profile = await getData(user.id)
  const isConnected = profile?.stripe_connected_linked

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage your payment methods and view your billing history</p>
          </div>

          {/* Stripe Connection Card */}
          <Card className="shadow-md border-muted max-w-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe Account
                </CardTitle>
                {isConnected ? (
                  <Badge
                    variant="outline"
                    className="bg-green-950/50 text-green-400 border-green-800/50 flex items-center gap-1 dark:bg-green-500/20 dark:text-green-300 dark:border-green-700/50"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-amber-950/50 text-amber-400 border-amber-800/50 flex items-center gap-1 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-700/50"
                  >
                    <AlertCircle className="h-3 w-3" />
                    Not Connected
                  </Badge>
                )}
              </div>
              <CardDescription>
                {isConnected
                  ? "Your Stripe account is connected. You can manage your payments and view your dashboard."
                  : "Connect your Stripe account to start accepting payments and manage your billing."}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {isConnected ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Access your Stripe dashboard to view transactions, manage payouts, and update your account
                      settings.
                    </p>
                    <form action={GetStripeDashboard}>
                      <Button className="w-full sm:w-auto flex items-center gap-2">
                        Go to Stripe Dashboard
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Connect your Stripe account to enable payment processing and access financial tools for your
                      business.
                    </p>
                    <form action={CreateStripeAccountLink}>
                      <ConnectStripe />
                    </form>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

