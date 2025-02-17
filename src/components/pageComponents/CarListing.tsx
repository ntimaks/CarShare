import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";

interface Car {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
}

interface CarListingProps {
    car: Car;
}

export default function CarListing({ car }: CarListingProps) {
    return (
        <Card key={car.id} className="bg-card border-border">
            <Image
                src={car.image}
                alt={`Featured Car ${car.id}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{car.description.length > 50 ? `${car.description.substring(0, 47)}...` : car.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-blue-500 font-semibold">${car.price}/day</span>
                    <Button className="bg-accent hover:bg-accent/90 text-blue-500-foreground">View Details</Button>
                </div>
            </div>
        </Card>
    )
}