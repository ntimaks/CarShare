'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Cancel() {
    const router = useRouter();
    return (

        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Payment Canceled</h1>
            <p className="text-sm text-muted-foreground">Please try again.</p>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
    );
}