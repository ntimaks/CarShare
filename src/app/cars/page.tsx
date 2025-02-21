"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import CarListing from "@/components/pageComponents/CarListing"
import { CarFilters } from "@/components/pageComponents/cars/CarFilters"
import type { DateRange } from "react-day-picker"
import DatePickerWithRange from "@/components/pageComponents/Date-Range-Picker"
import { Button } from "@/components/ui/button"

export default function CarsPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [, setCars] = useState<any[]>([])
    const [filteredCars, setFilteredCars] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [resetTrigger, setResetTrigger] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async (filters: any = {}) => {
        setIsLoading(true)
        let query = supabase.from("cars").select()

        if (filters.make) query = query.ilike("make", `%${filters.make}%`)
        if (filters.model) query = query.ilike("model", `%${filters.model}%`)
        if (filters.year) query = query.eq("year", filters.year)
        if (filters.transmission) query = query.eq("transmission", filters.transmission)
        if (filters.fuelType) query = query.eq("fuel_type", filters.fuelType)
        if (filters.vehicleType) query = query.eq("vehicle_type", filters.vehicleType)
        if (filters.seatingCapacity) query = query.gte("seating_capacity", filters.seatingCapacity)
        if (filters.priceRange) {
            query = query.gte("price_per_day", filters.priceRange[0]).lte("price_per_day", filters.priceRange[1])
        }
        if (filters.dateRange?.from && filters.dateRange?.to) {
            const fromDate = filters.dateRange.from.toISOString().split('T')[0]
            const toDate = filters.dateRange.to.toISOString().split('T')[0]

            query = query
                .lte('availability_from', toDate)
                .gte('availability_to', fromDate)
        }

        const { data, error } = await query

        if (error) {
            console.error("Error fetching cars:", error)
            setIsLoading(false)
            return
        }

        setCars(data)
        setFilteredCars(data)
        setIsLoading(false)
    }

    const handleFilterChange = (filters: any) => {
        fetchCars({ ...filters, dateRange })
    }

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            console.log("Fetching cars with date range:", dateRange)
            fetchCars({ dateRange })
        }
    }, [dateRange])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">Available Cars</h1>
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <DatePickerWithRange className="w-full max-w-sm" selected={dateRange} onSelect={setDateRange} />
                <CarFilters onFilterChange={handleFilterChange} resetTrigger={resetTrigger} />
            </div>
            {isLoading ? (
                <div className="text-center">Loading cars...</div>
            ) : filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.map((car) => (
                        <CarListing key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="mb-4">No cars found matching your criteria.</p>
                    <Button onClick={() => {
                        setDateRange(undefined)
                        setResetTrigger(prev => !prev)
                        fetchCars()
                    }}>Reset Filters</Button>
                </div>
            )}
        </div>
    )
}
