import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import LandingPageHeader from "@/components/pageComponents/landing/LandingPageHeader"
import LandingPageCarListings from "@/components/pageComponents/landing/LandingPageCarListings"
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data: cars, error } = await supabase.from("cars").select()

  if (error) {
    console.error("Error fetching cars:", error)
    return <div>Error loading cars. Please try again later.</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main>
        <LandingPageHeader />
        <LandingPageCarListings cars={cars} />

        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Search", description: "Find the perfect car for your trip" },
                { title: "Book", description: "Reserve your car with just a few clicks" },
                { title: "Drive", description: "Pick up the car and enjoy your journey" },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <Card className="w-12 h-12 border border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-semibold text-blue-500">{i + 1}</span>
                  </Card>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Share Your Car?</h2>
            <p className="text-muted-foreground mb-8">
              Earn extra income by renting out your car when you&apos;re not using it.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-blue-500-foreground">List Your Car</Button>
          </div>
        </section>
      </main>

    </div>
  );
}
