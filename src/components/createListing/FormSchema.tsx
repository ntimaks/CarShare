import { z } from "zod";

export const formSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
    licensePlate: z.string().min(1, "License plate number is required"),
    vin: z.string().optional(),
    transmission: z.enum(["Manual", "Automatic"]),
    fuelType: z.enum(["Gasoline", "Diesel", "Electric", "Hybrid"]),
    vehicleType: z.enum([
        "Sedan",
        "SUV",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Wagon",
        "Van",
        "Pickup",
        "Minivan",
        "Luxury"
    ]),
    seatingCapacity: z.string().regex(/^\d+$/, "Must be a number"),
    numberOfDoors: z.string().regex(/^\d+$/, "Must be a number"),
    trunkSpace: z.string(),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    features: z.array(z.string()).optional(),
    specialConditions: z.array(z.string()).optional(),
    photos: z.array(z.string()).optional(),
    pricePerDay: z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price"),
    weeklyDiscount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid discount")
        .optional(),
    monthlyDiscount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid discount")
        .optional(),
    mileageLimit: z.string().regex(/^\d+$/, "Must be a number").optional(),
    extraMileageCharge: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price")
        .optional(),
    fuelPolicy: z.enum(["Full-to-full", "Prepaid"]),
    availability: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    minRentalDuration: z.string().regex(/^\d+$/, "Must be a number"),
    maxRentalDuration: z.string().regex(/^\d+$/, "Must be a number"),
})