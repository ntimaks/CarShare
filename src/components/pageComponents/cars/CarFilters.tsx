"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerTitle, DrawerDescription, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"

interface CarFiltersProps {
    onFilterChange: (filters: CarFilterValues) => void
    resetTrigger?: boolean
}

interface CarFilterValues {
    make: string
    model: string
    year: string
    transmission: string
    fuelType: string
    vehicleType: string
    priceRange: number[]
    seatingCapacity: string
}

const defaultValues: CarFilterValues = {
    make: "",
    model: "",
    year: "",
    transmission: "",
    fuelType: "",
    vehicleType: "",
    priceRange: [0, 1000],
    seatingCapacity: "",
}

export function CarFilters({ onFilterChange, resetTrigger }: CarFiltersProps) {
    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>(["car-details"])
    const [activeFilterCount, setActiveFilterCount] = useState(0)

    const form = useForm<CarFilterValues>({
        defaultValues,
    })

    useEffect(() => {
        if (resetTrigger) {
            form.reset(defaultValues)
            setActiveFilterCount(0)
        }
    }, [resetTrigger])

    const onSubmit = (data: CarFilterValues) => {
        onFilterChange(data)
        const count = Object.values(data).filter((val) =>
            Array.isArray(val) ? val.some((v) => v !== 0) : val !== ""
        ).length
        setActiveFilterCount(count)
    }

    const resetFilters = () => {
        form.reset(defaultValues)
        setActiveFilterCount(0)
        onFilterChange(defaultValues)
    }

    const formatPriceRange = (range: number[]) => {
        return `€${range[0]} - €${range[1]}`
    }

    const FilterContent = () => (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {activeFilterCount > 0 && (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Active Filters:</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(form.getValues()).map(([key, value]) => {
                            if (Array.isArray(value) ? value.some((v) => v !== 0) : value !== "") {
                                return (
                                    <Badge key={key} variant="secondary" className="px-2 py-1">
                                        {key === "priceRange" ? formatPriceRange(value as number[]) : `${key}: ${value}`}
                                    </Badge>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
            )}
            <Accordion type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems} className="w-full">
                <AccordionItem value="car-details">
                    <AccordionTrigger>Car Details</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-0.5">
                            <div>
                                <Label htmlFor="make">Make</Label>
                                <Input
                                    id="make"
                                    {...form.register("make")}
                                    placeholder="Enter make"
                                />
                            </div>
                            <div>
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    {...form.register("model")}
                                    placeholder="Enter model"
                                />
                            </div>
                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    {...form.register("year")}
                                    placeholder="Enter year"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vehicle-specs">
                    <AccordionTrigger>Vehicle Specifications</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-0.5">
                            <div>
                                <Label htmlFor="transmission">Transmission</Label>
                                <Select
                                    value={form.watch("transmission")}
                                    onValueChange={(value) => form.setValue("transmission", value)}
                                >
                                    <SelectTrigger id="transmission">
                                        <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                        <SelectItem value="Automatic">Automatic</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="fuelType">Fuel Type</Label>
                                <Select value={form.watch("fuelType")} onValueChange={(value) => form.setValue("fuelType", value)}>
                                    <SelectTrigger id="fuelType">
                                        <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Gasoline">Gasoline</SelectItem>
                                        <SelectItem value="Diesel">Diesel</SelectItem>
                                        <SelectItem value="Electric">Electric</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="vehicleType">Vehicle Type</Label>
                                <Select value={form.watch("vehicleType")} onValueChange={(value) => form.setValue("vehicleType", value)}>
                                    <SelectTrigger id="vehicleType">
                                        <SelectValue placeholder="Select vehicle type" />
                                    </SelectTrigger>
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
                            </div>
                            <div>
                                <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                                <Input
                                    id="seatingCapacity"
                                    type="number"
                                    {...form.register("seatingCapacity")}
                                    placeholder="Enter seating capacity"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price-range">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <Label>Price Range (€ per day)</Label>
                            <Slider
                                min={0}
                                max={1000}
                                step={10}
                                value={form.watch("priceRange")}
                                onValueChange={(value) => form.setValue("priceRange", value)}
                                className="mt-2"
                            />
                            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                                <span>€{form.watch("priceRange")[0]}</span>
                                <span>€{form.watch("priceRange")[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={resetFilters}>
                    Reset Filters
                </Button>
                <Button type="submit">
                    Apply Filters
                </Button>
            </div>
        </form>
    )

    return (
        <>
            <div className="hidden md:block">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="relative">
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="absolute -top-2 -right-2 px-2 py-1">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Filters</DialogTitle>
                            <DialogDescription>Customize your car search with these filters.</DialogDescription>
                        </DialogHeader>
                        <FilterContent />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="md:hidden">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="relative">
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="absolute -top-2 -right-2 px-2 py-1">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Filters</DrawerTitle>
                            <DrawerDescription>Customize your car search with these filters.</DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 pb-4">
                            <FilterContent />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

