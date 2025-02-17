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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { onSubmit } from "./SubmitFunction";
import { formSchema } from "./FormSchema";





export default function CarListingForm() {
    const [, setImageUrls] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            features: [],
            safetyFeatures: [],
            photos: [],
        },
    });

    const handleImagesChange = (urls: string[]) => {
        setImageUrls(urls);
        form.setValue('photos', urls); // Update form state with image URLs
    };





    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Car Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <FormControl>
                                        <Input placeholder="e.g. Sedan, SUV, Truck" {...field} />
                                    </FormControl>
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
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Provide a detailed description of your vehicle..."
                                            className="resize-none"
                                            {...field}
                                        />
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
                                    <FormLabel className="text-base">Available Features</FormLabel>
                                    <FormDescription>Select all that apply.</FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {["GPS", "Bluetooth", "Air Conditioning", "Heated Seats", "Sunroof", "Backup Camera"].map(
                                        (feature) => (
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
                                        ),
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="safetyFeatures"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Safety Features</FormLabel>
                                    <FormDescription>Select all that apply.</FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {["Airbags", "ABS", "Parking Sensors", "Lane Departure Warning", "Blind Spot Monitor"].map(
                                        (feature) => (
                                            <FormField
                                                key={feature}
                                                control={form.control}
                                                name="safetyFeatures"
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
                                        ),
                                    )}
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
                                    <FormLabel>Price per Day</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
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
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Availability</FormLabel>
                                <DatePickerWithRange
                                    className="w-full"
                                    onSelect={(range) => field.onChange(range)}
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

