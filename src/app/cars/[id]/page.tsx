"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import BookingForm from "@/components/pageComponents/carListing/BookingForm"
import type { DateRange } from "react-day-picker"

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
    special_conditions: string[]
    weekly_discount: number | null
    monthly_discount: number | null
    mileage_limit: number | null
    extra_mileage_charge: number | null
    fuel_policy: string
    min_rental_duration: number
    max_rental_duration: number
    availability_from: string
    availability_to: string
}

export default function CarDetails() {
    const params = useParams()
    const id = params.id
    const [car, setCar] = useState<Car | null>(null)
    const [_api, _setApi] = useState<CarouselApi>()
    const [dateRange, setDateRange] = useState<DateRange | undefined>()



    useEffect(() => {
        if (id) {
            const fetchCar = async () => {
                const supabase = createClient()
                const { data, error } = await supabase.from("cars").select("*").eq("id", id).single()

                if (error) {
                    console.error("Error fetching car:", error)
                } else {
                    setCar(data)
                    console.log('Car data:', data)

                }
            }

            fetchCar()
        }
    }, [id])
    const handleThumbnailClick = (index: number) => {
        if (_api) {
            _api.scrollTo(index)
        }
    }

    if (!car) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Takes up 2 columns */}
                <div className="lg:col-span-2 space-y-8 w-full">
                    {/* Car Images Carousel */}
                    <div className="grid grid-cols-1 gap-2">
                        <Carousel className="w-full " setApi={_setApi}>
                            <CarouselContent>
                                {car.photos.map((photo, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative h-96">
                                            <Image
                                                src={photo || "/placeholder.svg"}
                                                alt={`${car.make} ${car.model} - Image ${index + 1}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {car.photos.length > 1 && (
                                <>
                                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                                </>
                            )}
                        </Carousel>
                        {car.photos.length > 1 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {car.photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative h-24 w-full cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <Image
                                            src={photo || "/placeholder.svg"}
                                            alt={`${car.make} ${car.model} - Image ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Car Details */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold">
                                {car.year} {car.make} {car.model}
                            </h1>
                        </div>

                        {/* Features and other details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div dangerouslySetInnerHTML={{ __html: car.description }} />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Features</h3>
                        <div className="flex flex-wrap gap-2">
                            {car.features.map((feature, index) => (
                                <Badge key={index} variant="outline">
                                    {feature}
                                </Badge>
                            ))}
                        </div>
                        <h3 className="text-xl font-semibold mt-6 mb-2">Special Conditions</h3>
                        <div className="flex flex-wrap gap-2">
                            {car.special_conditions.map((condition, index) => (
                                <Badge key={index} variant="outline">
                                    {condition}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Form - Takes up 1 column */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <BookingForm
                            dateRange={dateRange}
                            onDateRangeChange={setDateRange}
                            car={{
                                id: car.id,
                                price_per_day: car.price_per_day,
                                weekly_discount: car.weekly_discount,
                                monthly_discount: car.monthly_discount,
                                mileage_limit: car.mileage_limit,
                                extra_mileage_charge: car.extra_mileage_charge
                            }}
                        />
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
                    <div>
                        <p className="font-semibold">Available From:</p>
                        <p>{new Date(car.availability_from).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Available Until:</p>
                        <p>{new Date(car.availability_to).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
