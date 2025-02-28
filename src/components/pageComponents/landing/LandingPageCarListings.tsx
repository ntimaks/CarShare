"use client"

import React from "react"
import CarListing from "../cars/CarListingPreview"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Car {
    id: number
    make: string
    model: string
    year: number
    price_per_day: number
    photos: string[]
    vehicle_type: string
    transmission: string
    fuel_type: string
}

interface PaginatedCarListingsProps {
    cars: Car[]
}

export default function PaginatedCarListings({ cars }: PaginatedCarListingsProps) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const carsPerPage = 3;
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const totalPages = Math.ceil(cars.length / carsPerPage);

    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="container mx-auto px-4 flex flex-col gap-4 mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">Featured Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars && cars.slice(indexOfFirstCar, indexOfLastCar).map((car) => (
                    <CarListing key={car.id} car={car} />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {currentPage !== 1 && <PaginationPrevious onClick={handlePreviousClick}  />}
                    </PaginationItem>
                    {currentPage !== 1 && <PaginationEllipsis />}
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(currentPage - 1)} isActive={false} >
                                {currentPage - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink onClick={() => setCurrentPage(currentPage)} isActive={true} >
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(currentPage + 1)} isActive={false} >
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage !== totalPages && <PaginationEllipsis />}
                    <PaginationItem>
                        {currentPage !== totalPages && <PaginationNext onClick={handleNextClick}  />}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}