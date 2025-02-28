import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import Image from "next/image"; 
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";

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

interface CarListingProps {
    car: Car;
}

export default function CarListing({ car }: CarListingProps) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <Card key={car.id} className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    {imageLoading && (
                        <div className="absolute inset-0 z-10">
                            <Skeleton className="h-full w-full" />
                        </div>
                    )}
                    <Image
                        src={car.photos ? car.photos[0] : '/placeholder-car.jpg'}
                        alt={`${car.make} ${car.model}`}
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => setImageLoading(false)}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">
                    {car.year} {car.make} {car.model}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{car.vehicle_type}</Badge>
                    <Badge variant="outline">{car.transmission}</Badge>
                    <Badge variant="outline">{car.fuel_type}</Badge>
                </div>
                <p className="text-muted-foreground">${car.price_per_day} per day</p>
            </CardContent>
            <CardFooter className="p-4">
                <Link href={`/cars/${car.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}