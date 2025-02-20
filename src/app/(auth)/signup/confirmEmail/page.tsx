import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmEmailPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
            <main className="w-full max-w-md space-y-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight">Confirm your email</h1>
                <p className="text-lg text-gray-400">
                    We've sent a confirmation link to your email address. Please check your inbox and click the link to activate
                    your account.
                </p>
                <div className="pt-8 text-sm">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        ← Back to home
                    </Link>
                </div>
            </main>
            <footer className="absolute bottom-8 text-center text-xs text-gray-600">
                <p>Didn't receive an email? Check your spam folder or contact support.</p>
            </footer>
        </div>
    )
}