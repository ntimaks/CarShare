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
    const [date, setDate] = React.useState<DateRange | undefined>(selected || {
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className={cn("grid gap-2", className)}>
            {isDesktop ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
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
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
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
                            <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={1} />
                        </div>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    )
}

export default DatePickerWithRange

