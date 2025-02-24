"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import DatePickerWithRange from "@/components/pageComponents/Date-Range-Picker"
import ImageUpload from "@/components/pageComponents/image-upload"
import { useState } from "react"
import { onSubmit } from "./SubmitFunction";
import { formSchema } from "./FormSchema";
import RichTextEditor from "@/components/RichTextEditor"





export default function CarListingForm() {
    const [, setImageUrls] = useState<string[]>([]);
    const [imageKeys, setImageKeys] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            features: [],
            specialConditions: [],
            photos: [],
        },
    });

    const handleImagesChange = (urls: string[], keys: string[]) => {
        setImageUrls(urls);
        setImageKeys(keys);
        form.setValue('photos', urls);
    };





    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => onSubmit(values, imageKeys))} className="space-y-8 p-4">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Car Information</h2>
                    <FormField
                        control={form.control}
                        name="make"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Make</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Toyota" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Corolla" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 2022" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>License Plate Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. ABC123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VIN (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Vehicle Identification Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="transmission"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transmission</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select transmission type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Manual">Manual</SelectItem>
                                            <SelectItem value="Automatic">Automatic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fuelType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fuel Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select fuel type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Gasoline">Gasoline</SelectItem>
                                            <SelectItem value="Diesel">Diesel</SelectItem>
                                            <SelectItem value="Electric">Electric</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select vehicle type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Sedan">Sedan</SelectItem>
                                            <SelectItem value="SUV">SUV</SelectItem>
                                            <SelectItem value="Hatchback">Hatchback</SelectItem>
                                            <SelectItem value="Coupe">Coupe</SelectItem>
                                            <SelectItem value="Convertible">Convertible</SelectItem>
                                            <SelectItem value="Wagon">Wagon</SelectItem>
                                            <SelectItem value="Van">Van</SelectItem>
                                            <SelectItem value="Pickup">Pickup</SelectItem>
                                            <SelectItem value="Minivan">Minivan</SelectItem>
                                            <SelectItem value="Luxury">Luxury</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="seatingCapacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seating Capacity</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfDoors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Doors</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="trunkSpace"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trunk/Storage Space</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 15 cubic feet" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Description</FormLabel>
                                    <FormControl>
                                        <RichTextEditor content={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription>
                                        Describe your vehicle&apos;s condition, special features, and any other relevant information.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="features"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Features</FormLabel>
                                    <FormDescription>Select all that apply.</FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        "GPS Navigation",
                                        "Bluetooth",
                                        "Air Conditioning",
                                        "Heated Seats",
                                        "Sunroof",
                                        "Backup Camera",
                                        "Apple CarPlay",
                                        "Android Auto",
                                        "Wireless Charging",
                                        "Premium Sound System",
                                        "Keyless Entry",
                                        "Push Start",
                                        "Cruise Control",
                                        "Airbags",
                                        "ABS",
                                        "Parking Sensors",
                                        "Lane Departure Warning",
                                        "Blind Spot Monitor",
                                        "360° Camera",
                                        "Leather Seats"
                                    ].map((feature) => (
                                        <FormField
                                            key={feature}
                                            control={form.control}
                                            name="features"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem key={feature} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...(field.value || []), feature])
                                                                        : field.onChange(field.value?.filter((value) => value !== feature) || [])
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{feature}</FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="specialConditions"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Special Conditions</FormLabel>
                                    <FormDescription>Select all that apply.</FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        "Pets Allowed",
                                        "Smoking Allowed",
                                        "Trips Abroad Allowed"
                                    ].map((condition) => (
                                        <FormField
                                            key={condition}
                                            control={form.control}
                                            name="specialConditions"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem key={condition} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(condition)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...(field.value || []), condition])
                                                                        : field.onChange(field.value?.filter((value) => value !== condition) || [])
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{condition}</FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photos"
                        render={({ }) => (
                            <FormItem>
                                <FormLabel>Photos</FormLabel>
                                <FormControl>
                                    <ImageUpload onImagesChange={handleImagesChange} />
                                </FormControl>
                                <FormDescription>
                                    Upload photos of your car (Front, Rear, Side, Interior, Dashboard, Seats, Trunk)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Pricing & Rental Terms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="pricePerDay"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price per Day (€)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2">€</span>
                                            <Input type="number" step="0.01" {...field} className="pl-7" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weeklyDiscount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weekly Discount (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="monthlyDiscount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monthly Discount (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mileageLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mileage Limit (km)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="extraMileageCharge"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Extra Mileage Charge (per km)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fuelPolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fuel Policy</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select fuel policy" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Full-to-full">Full-to-full</SelectItem>
                                            <SelectItem value="Prepaid">Prepaid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="availability"
                        render={({ _field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Availability</FormLabel>
                                <DatePickerWithRange
                                    className="w-full"
                                    onSelect={(range) => setDateRange(range)}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="minRentalDuration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minimum Rental Duration (days)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxRentalDuration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Rental Duration (days)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit">Submit Listing</Button>
            </form>
        </Form>
    )
}

