export default function Footer() {
    return (
        <footer className="border-t border-border mt-12 py-8">
            <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} CarShare. All rights reserved.</p>
            </div>
        </footer>
    )
}