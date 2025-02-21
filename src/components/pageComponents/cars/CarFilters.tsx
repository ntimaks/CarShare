"use client"

import { useState, useRef, useEffect } from "react"
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
    onFilterChange: (filters: any) => void
}

export function CarFilters({ onFilterChange }: CarFiltersProps) {
    const [filters, setFilters] = useState({
        make: "",
        model: "",
        year: "",
        transmission: "",
        fuelType: "",
        vehicleType: "",
        priceRange: [0, 1000],
        seatingCapacity: "",
    })
    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>(["car-details"])
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
    const [activeFilterCount, setActiveFilterCount] = useState(0)

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => {
            const newFilters = { ...prev, [key]: value }
            const count = Object.values(newFilters).filter((val) =>
                Array.isArray(val) ? val.some((v) => v !== 0) : val !== "",
            ).length
            setActiveFilterCount(count)
            return newFilters
        })
    }

    const applyFilters = () => {
        onFilterChange(filters)
    }

    const resetFilters = () => {
        setFilters({
            make: "",
            model: "",
            year: "",
            transmission: "",
            fuelType: "",
            vehicleType: "",
            priceRange: [0, 1000],
            seatingCapacity: "",
        })
        setActiveFilterCount(0)
        onFilterChange({})
    }

    useEffect(() => {
        // Refocus the input after state update
        Object.keys(inputRefs.current).forEach((key) => {
            if (document.activeElement === inputRefs.current[key]) {
                inputRefs.current[key]?.focus()
            }
        })
    }, [filters])

    const formatPriceRange = (range: number[]) => {
        return `€${range[0]} - €${range[1]}`
    }

    const FilterContent = () => (
        <div className="space-y-4">
            {activeFilterCount > 0 && (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Active Filters:</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) => {
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
                                    value={filters.make}
                                    onChange={(e) => handleFilterChange("make", e.target.value)}
                                    placeholder="Enter make"
                                    ref={(el) => {
                                        inputRefs.current["make"] = el
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    value={filters.model}
                                    onChange={(e) => handleFilterChange("model", e.target.value)}
                                    placeholder="Enter model"
                                    ref={(el) => {
                                        inputRefs.current["model"] = el
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    value={filters.year}
                                    onChange={(e) => handleFilterChange("year", e.target.value)}
                                    placeholder="Enter year"
                                    ref={(el) => {
                                        inputRefs.current["year"] = el
                                    }}
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
                                    value={filters.transmission}
                                    onValueChange={(value) => handleFilterChange("transmission", value)}
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
                                <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
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
                                <Select value={filters.vehicleType} onValueChange={(value) => handleFilterChange("vehicleType", value)}>
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
                                    value={filters.seatingCapacity}
                                    onChange={(e) => handleFilterChange("seatingCapacity", e.target.value)}
                                    placeholder="Enter seating capacity"
                                    type="number"
                                    ref={(el) => {
                                        inputRefs.current["seatingCapacity"] = el
                                    }}
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
                                value={filters.priceRange}
                                onValueChange={(value) => handleFilterChange("priceRange", value)}
                                className="mt-2"
                            />
                            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                                <span>€{filters.priceRange[0]}</span>
                                <span>€{filters.priceRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                </Button>
                <Button onClick={applyFilters} disabled={activeFilterCount === 0}>
                    Apply Filters
                </Button>
            </div>
        </div>
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
                        <div className="px-4">
                            <FilterContent />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

