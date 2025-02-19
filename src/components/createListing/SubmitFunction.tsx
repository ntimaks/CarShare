import { toast } from "@/hooks/use-toast";
import { createClient } from '@/utils/supabase/client'
import { z } from "zod";
import { formSchema } from "./FormSchema";



export async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const supabase = await createClient();

        console.log('=== Form Submission Values ===');
        console.log('Basic Information:');
        console.log('- Make:', values.make);
        console.log('- Model:', values.model);
        console.log('- Year:', values.year);
        console.log('- License Plate:', values.licensePlate);
        console.log('- VIN:', values.vin || 'Not provided');

        console.log('\nVehicle Details:');
        console.log('- Transmission:', values.transmission);
        console.log('- Fuel Type:', values.fuelType);
        console.log('- Vehicle Type:', values.vehicleType);
        console.log('- Seating Capacity:', values.seatingCapacity);
        console.log('- Number of Doors:', values.numberOfDoors);
        console.log('- Trunk Space:', values.trunkSpace);

        console.log('\nFeatures:');
        console.log('- Features:', values.features);
        console.log('- Safety Features:', values.specialConditions);
        console.log('- Photos:', values.photos);

        console.log('\nPricing and Terms:');
        console.log('- Price per Day:', values.pricePerDay);
        console.log('- Weekly Discount:', values.weeklyDiscount || 'None');
        console.log('- Monthly Discount:', values.monthlyDiscount || 'None');
        console.log('- Mileage Limit:', values.mileageLimit || 'Unlimited');
        console.log('- Extra Mileage Charge:', values.extraMileageCharge || 'None');
        console.log('- Fuel Policy:', values.fuelPolicy);

        console.log('\nAvailability:');
        console.log('- Date Range:', values.availability || 'Not specified');
        console.log('- Min Rental Duration:', values.minRentalDuration, 'days');
        console.log('- Max Rental Duration:', values.maxRentalDuration, 'days');

        const { error } = await supabase
            .from('cars')
            .insert([
                {
                    make: values.make,
                    model: values.model,
                    year: values.year,
                    license_plate: values.licensePlate,
                    vin: values.vin,
                    transmission: values.transmission,
                    fuel_type: values.fuelType,
                    vehicle_type: values.vehicleType,
                    seating_capacity: parseInt(values.seatingCapacity),
                    number_of_doors: parseInt(values.numberOfDoors),
                    trunk_space: values.trunkSpace,
                    description: values.description,
                    features: values.features,
                    special_conditions: values.specialConditions,
                    photos: values.photos,
                    price_per_day: parseFloat(values.pricePerDay),
                    weekly_discount: values.weeklyDiscount ? parseFloat(values.weeklyDiscount) : null,
                    monthly_discount: values.monthlyDiscount ? parseFloat(values.monthlyDiscount) : null,
                    mileage_limit: values.mileageLimit ? parseInt(values.mileageLimit) : null,
                    extra_mileage_charge: values.extraMileageCharge ? parseFloat(values.extraMileageCharge) : null,
                    fuel_policy: values.fuelPolicy,
                    availability_from: values.availability?.from,
                    availability_to: values.availability?.to,
                    min_rental_duration: parseInt(values.minRentalDuration),
                    max_rental_duration: parseInt(values.maxRentalDuration)
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        toast({
            title: "Success",
            description: "Your car listing has been submitted successfully.",
        })

        window.location.href = '/';

        // Optional: Reset form
        // form.reset()
    } catch (error) {
        console.error("Submission error:", error)
        toast({
            title: "Error",
            description: "There was a problem submitting your listing. Please try again.",
            variant: "destructive",
        })
    }
}