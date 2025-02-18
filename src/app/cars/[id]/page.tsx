"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"


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
    license_plate: string
    vin: string
    seating_capacity: number
    number_of_doors: number
    trunk_space: string
    description: string
    features: string[]
    safety_features: string[]
    weekly_discount: number | null
    monthly_discount: number | null
    mileage_limit: number | null
    extra_mileage_charge: number | null
    fuel_policy: string
    min_rental_duration: number
    max_rental_duration: number
}

export default function CarDetails() {
    const params = useParams()
    const id = params.id
    const [car, setCar] = useState<Car | null>(null)

    useEffect(() => {
        if (id) {
            const fetchCar = async () => {
                const supabase = createClient()
                const { data, error } = await supabase.from("cars").select("*").eq("id", id).single()

                if (error) {
                    console.error("Error fetching car:", error)
                } else {
                    setCar(data)
                }
            }

            fetchCar()
        }
    }, [id])

    if (!car) {
        return <div>Loading...</div>
    }



    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {car.year} {car.make} {car.model}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    {car.photos.map((photo, index) => (
                        <div key={index} className="relative h-64 md:h-96">
                            <Image
                                src={photo || "/placeholder.svg"}
                                alt={`${car.make} ${car.model} - Image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Car Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Vehicle Type:</p>
                            <Badge variant="secondary">{car.vehicle_type}</Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Transmission:</p>
                            <Badge variant="secondary">{car.transmission}</Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Fuel Type:</p>
                            <Badge variant="secondary">{car.fuel_type}</Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Seating Capacity:</p>
                            <p>{car.seating_capacity}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Number of Doors:</p>
                            <p>{car.number_of_doors}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Trunk Space:</p>
                            <p>{car.trunk_space}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                    <p>{car.description}</p>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, index) => (
                            <Badge key={index} variant="outline">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Safety Features</h3>
                    <div className="flex flex-wrap gap-2">
                        {car.safety_features.map((feature, index) => (
                            <Badge key={index} variant="outline">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Pricing and Rental Terms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="font-semibold">Price per Day:</p>
                        <p>${car.price_per_day}</p>
                    </div>
                    {car.weekly_discount && (
                        <div>
                            <p className="font-semibold">Weekly Discount:</p>
                            <p>{car.weekly_discount}%</p>
                        </div>
                    )}
                    {car.monthly_discount && (
                        <div>
                            <p className="font-semibold">Monthly Discount:</p>
                            <p>{car.monthly_discount}%</p>
                        </div>
                    )}
                    {car.mileage_limit && (
                        <div>
                            <p className="font-semibold">Mileage Limit:</p>
                            <p>{car.mileage_limit} km</p>
                        </div>
                    )}
                    {car.extra_mileage_charge && (
                        <div>
                            <p className="font-semibold">Extra Mileage Charge:</p>
                            <p>${car.extra_mileage_charge} per km</p>
                        </div>
                    )}
                    <div>
                        <p className="font-semibold">Fuel Policy:</p>
                        <p>{car.fuel_policy}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Minimum Rental Duration:</p>
                        <p>{car.min_rental_duration} days</p>
                    </div>
                    <div>
                        <p className="font-semibold">Maximum Rental Duration:</p>
                        <p>{car.max_rental_duration} days</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Button className="w-full md:w-auto">Book Now</Button>
            </div>
        </div>
    )
}
