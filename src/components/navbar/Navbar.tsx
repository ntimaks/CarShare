import Link from "next/link";
import { Frame } from "lucide-react";
import LoginLogoutButton from "../pageComponents/LoginLogoutButton";

export default function Navbar() {
    return (
        <header className="border-b border-border">
            <div className="container mx-auto py-4 px-1 flex flex-row justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Frame className="w-6 h-6 text-blue-500" />
                    <span className="text-lg font-semibold">CarShare</span>
                </Link>
                <nav className="space-x-3 text-sm">
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                        How It Works
                    </Link>
                    <Link href="/createListing" className="hover:text-blue-500 transition-colors">
                        List Your Car
                    </Link>

                    <LoginLogoutButton />
                </nav>
            </div>
        </header>
    )
}