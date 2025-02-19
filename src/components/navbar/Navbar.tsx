"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Frame, LogIn, LogOut, Menu, UserCircle } from "lucide-react"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user)
                } else {
                    setUser(null)
                }
                setLoading(false)
                router.refresh()
            }
        )

        fetchUser()

        // Cleanup subscription
        return () => {
            subscription.unsubscribe()
        }
    }, [supabase.auth, router])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.push("/")
    }

    if (loading) return <div>Loading...</div>

    return (
        <header className="border-b border-border">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Frame className="w-6 h-6 text-blue-500" />
                    <span className="text-lg font-semibold">CarShare</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-4">
                        <Link href="#" className="text-sm hover:text-primary transition-colors">
                            How It Works
                        </Link>
                        <Link href="/createListing" className="text-sm hover:text-primary transition-colors">
                            List Your Car
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <UserMenu user={user} onSignOut={handleSignOut} />
                        ) : (
                            <Button variant="outline" onClick={() => router.push("/login")}>
                                <LogIn className="mr-2 h-4 w-4" /> Login
                            </Button>
                        )}
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}

function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
                        <AvatarFallback>{getInitials(user.user_metadata.full_name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function MobileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href="#">How It Works</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/createListing">List Your Car</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

export default Navbar