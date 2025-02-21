"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DatePickerWithRange from "../Date-Range-Picker";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPageHeader() {
    const router = useRouter();
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const handleDateSelect = (date: DateRange | undefined) => {
        setDateRange(date);
    }

    const handleSearch = () => {
        if (dateRange?.from && dateRange?.to) {
            const fromDate = dateRange.from.toISOString().split('T')[0];
            const toDate = dateRange.to.toISOString().split('T')[0];
            router.push(`/cars?from=${fromDate}&to=${toDate}`);
        } else {
            router.push('/cars');
        }
    }

    return (
        <section className="py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Rent the Perfect Car</h1>
            <p className="text-lg text-muted-foreground mb-8">Discover unique cars from local hosts in Latvia</p>
            <div className="max-w-3xl mx-auto bg-card p-4 rounded-lg flex flex-wrap gap-4 justify-center items-center">
                <div className="flex-grow">
                    <DatePickerWithRange className="w-full" onSelect={handleDateSelect} />
                </div>
                <Button
                    className="bg-accent hover:bg-accent/90 text-blue-500-foreground"
                    onClick={handleSearch}
                >
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
            </div>
        </section>
    )
}