"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/UseMediaQuery"

interface DatePickerProps {
    className?: string;
    selected?: DateRange;
    onSelect: (date: DateRange | undefined) => void;
}

const DatePickerWithRange: React.FC<DatePickerProps> = ({
    className,
    selected,
    onSelect,
}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const handleSelect = (newDate: DateRange | undefined) => {
        if (newDate?.from && newDate?.to) {
            onSelect(newDate)
        }
    }

    return (
        <div className={cn("grid gap-2", className)}>
            {isDesktop ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !selected && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selected?.from ? (
                                selected.to ? (
                                    <>
                                        {format(selected.from, "LLL dd, y")} - {format(selected.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(selected.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={selected?.from}
                            selected={selected}
                            onSelect={handleSelect}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                // Mobile drawer implementation remains the same but uses handleSelect
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !selected && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selected?.from ? (
                                selected.to ? (
                                    <>
                                        {format(selected.from, "LLL dd, y")} - {format(selected.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(selected.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Select Date Range</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 flex justify-center">
                            <Calendar
                                mode="range"
                                defaultMonth={selected?.from}
                                selected={selected}
                                onSelect={handleSelect}
                                numberOfMonths={1}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    )
}

export default DatePickerWithRange