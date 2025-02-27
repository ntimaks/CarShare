"use client";

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom";

export default function ConnectStripe() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className="w-full" size="lg">
                    Processing...
                </Button>
            ) : (
                <Button type="submit" className="w-full" size="lg">
                    Connect to Stripe
                </Button>
            )}
        </>
    );
}