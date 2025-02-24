"use client"
import type { DateRange } from "react-day-picker"
import { Heart, Mail, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePickerWithRange from "@/components/pageComponents/Date-Range-Picker"
import { useState, useEffect } from "react"

interface BookingFormProps {
    dateRange?: DateRange
    onDateRangeChange: (range: DateRange | undefined) => void
    car: {
        price_per_day: number
        weekly_discount: number | null
        monthly_discount: number | null
        mileage_limit: number | null
        extra_mileage_charge: number | null
    }
}

export default function BookingForm({ dateRange, onDateRangeChange, car }: BookingFormProps) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [numberOfDays, setNumberOfDays] = useState(0)

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            const days = Math.ceil(
                (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
            )
            setNumberOfDays(days)

            let discount = 0
            const baseTotal = car.price_per_day * days

            // Apply weekly discount
            if (days >= 7 && car.weekly_discount) {
                discount = (baseTotal * car.weekly_discount) / 100
            }
            // Apply monthly discount
            else if (days >= 30 && car.monthly_discount) {
                discount = (baseTotal * car.monthly_discount) / 100
            }

            setDiscountAmount(discount)
            setTotalPrice(baseTotal - discount)
        } else {
            setTotalPrice(0)
            setDiscountAmount(0)
            setNumberOfDays(0)
        }
    }, [dateRange, car])

    return (
        <div className="w-full p-6 space-y-6 bg-black rounded-lg shadow-sm border">
            {/* Price Header */}
            <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">€{car.price_per_day}</span>
                    <span className="text-sm text-muted-foreground">/day</span>
                </div>
                {(car.weekly_discount || car.monthly_discount) && (
                    <div className="flex flex-col gap-1">
                        {car.weekly_discount && (
                            <Badge variant="secondary" className="w-fit">
                                {car.weekly_discount}% weekly discount
                            </Badge>
                        )}
                        {car.monthly_discount && (
                            <Badge variant="secondary" className="w-fit">
                                {car.monthly_discount}% monthly discount
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Date Range Picker */}
            <div className="space-y-4">
                <DatePickerWithRange
                    selected={dateRange}
                    onSelect={onDateRangeChange}
                />

                {/* Location Selector */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup & return location</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="location1">Downtown</SelectItem>
                            <SelectItem value="location2">Airport</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Price Breakdown */}
            {totalPrice > 0 && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Base price ({numberOfDays} days)</span>
                        <span className="text-sm">€{car.price_per_day * numberOfDays}</span>
                    </div>
                    {discountAmount > 0 && (
                        <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                            <span className="text-sm font-medium">Discount</span>
                            <span className="text-sm font-medium text-green-600">-€{discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            )}

            {/* Continue Button */}
            <Button className="w-full" size="lg">
                Continue
            </Button>

            {/* Features */}
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <Badge variant="outline" className="rounded-full">
                        Free cancellation
                    </Badge>
                    <p className="text-sm text-muted-foreground">Free up to 24 hours before booking</p>
                </div>

                <div className="flex items-start gap-3">
                    <Badge variant="outline" className="rounded-full flex items-center justify-center">
                        <p className="text-center">Flexible payment</p>
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                        $0 to book when you choose the Stay flexible option at checkout
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Distance included</span>
                        <span className="text-sm font-medium">600 mi</span>
                    </div>
                    <p className="text-sm text-muted-foreground">$0.22/mi fee for additional miles driven</p>
                </div>
            </div>

            <Separator />

            {/* Insurance Section */}
            <div>
                <h3 className="text-sm font-medium uppercase text-muted-foreground mb-2">Insurance & Protection</h3>
                <p className="text-sm">Insurance via Travelers</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-between">
                <Button variant="outline" className="flex-1">
                    Add to favorites
                    <Heart className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Footer Links */}
            <div className="space-y-2">
                <button className="text-sm text-primary hover:underline">Report listing</button>
                <button className="text-sm text-primary hover:underline block">Cancellation policy</button>
            </div>
        </div>
    )
}

