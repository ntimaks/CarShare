import DatePickerWithRange from "@/components/pageComponents/landing/Date-Range-Picker";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import sampleCars from "@/components/pageComponents/landing/sample_cars.json"
import CarListing from "@/components/pageComponents/CarListing"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main>
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Rent the Perfect Car</h1>
          <p className="text-lg text-muted-foreground mb-8">Discover unique cars from local hosts in Latvia</p>
          <div className="max-w-3xl mx-auto bg-card p-4 rounded-lg flex flex-wrap gap-4 justify-center items-center">
            <div className="flex-grow">
              <DatePickerWithRange className="w-full" />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-blue-500-foreground">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Featured Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleCars.map((car) => (
                <CarListing key={String(car.id)} car={{ ...car, id: String(car.id) }} />
              ))}
            </div>
          </div>
        </section>

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
