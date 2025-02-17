"use client"

import CarListing from "../CarListing";
import sampleCars from "./sample_cars.json";
import React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function LandingPageCarListings() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const carsPerPage = 3;
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = sampleCars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(sampleCars.length / carsPerPage);

    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold mb-8 text-center">Featured Cars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentCars.map((car) => (
                        <CarListing key={String(car.id)} car={{ ...car, id: String(car.id) }} />
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            {currentPage !== 1 && <PaginationPrevious onClick={handlePreviousClick} />}
                        </PaginationItem>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(currentPage - 1)} isActive={false}>
                                    {currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink onClick={() => setCurrentPage(currentPage)} isActive={true}>
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(currentPage + 1)} isActive={false}>
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            {currentPage !== totalPages && <PaginationNext onClick={handleNextClick} />}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}