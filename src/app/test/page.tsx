import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface Car {
    id: number
    make: string
    model: string
    year: number
    price_per_day: number
    photos: string[]
    vehicle_type: string
    transmission: string
    fuel_type: string
}

export default async function AvailableCars() {
    const supabase = await createClient()
    const { data: cars, error } = await supabase.from("cars").select()

    if (error) {
        console.error("Error fetching cars:", error)
        return <div>Error loading cars. Please try again later.</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Available Cars</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car: Car) => (
                    <Card key={car.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={car.photos ? car.photos[0] : '/placeholder-car.jpg'} // Use first photo from array with fallback
                                    alt={`${car.make} ${car.model}`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-xl mb-2">
                                {car.year} {car.make} {car.model}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="secondary">{car.vehicle_type}</Badge>
                                <Badge variant="secondary">{car.transmission}</Badge>
                                <Badge variant="secondary">{car.fuel_type}</Badge>
                            </div>
                            <p className="text-muted-foreground">${car.price_per_day} per day</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button className="w-full">Book Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

