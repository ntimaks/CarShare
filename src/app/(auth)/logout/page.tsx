'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const LogoutPage = () => {
    const router = useRouter();
    useEffect(() => {
        toast({
            title: "You have been successfully logged out.",
            description: "Redirecting to home page...",
        });
        setTimeout(() => router.push("/"), 2000);
    }, [router]);

};

export default LogoutPage;