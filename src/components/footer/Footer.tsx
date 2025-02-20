import { Frame } from "lucide-react"
import Link from "next/link"

interface MenuItem {
    title: string
    links: {
        text: string
        url: string
    }[]
}

interface FooterProps {
    logo?: {
        url: string
        alt: string
        title: string
    }
    tagline?: string
    menuItems?: MenuItem[]
    copyright?: string
    bottomLinks?: {
        text: string
        url: string
    }[]
}

const Footer = ({
    logo = {
        url: "/",
        alt: "CarShare logo",
        title: "CarShare",
    },
    tagline = "Rent the perfect car for your journey.",
    menuItems = [
        {
            title: "Rent",
            links: [
                { text: "Available Cars", url: "/available-cars" },
                { text: "How It Works", url: "#how-it-works" },
                { text: "Pricing", url: "#pricing" },
                { text: "FAQs", url: "#faqs" },
            ],
        },
        {
            title: "Host",
            links: [
                { text: "List Your Car", url: "/list-your-car" },
                { text: "Host Requirements", url: "#host-requirements" },
                { text: "Host Benefits", url: "#host-benefits" },
                { text: "Host FAQs", url: "#host-faqs" },
            ],
        },
        {
            title: "Company",
            links: [
                { text: "About Us", url: "#about" },
                { text: "Blog", url: "#blog" },
                { text: "Careers", url: "#careers" },
                { text: "Contact", url: "#contact" },
            ],
        },
        {
            title: "Legal",
            links: [
                { text: "Terms of Service", url: "#terms" },
                { text: "Privacy Policy", url: "#privacy" },
                { text: "Cookie Policy", url: "#cookie" },
            ],
        },
    ],
    copyright = "© 2025 CarShare. All rights reserved.",
    bottomLinks = [
        { text: "Terms and Conditions", url: "#terms" },
        { text: "Privacy Policy", url: "#privacy" },
    ],
}: FooterProps) => {
    return (
        <footer className="bg-background border-t w-full">
            <div className="w-full mx-auto px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-8 lg:mb-0">
                        <div className="flex items-center gap-2">
                            <Link href={logo.url} className="flex items-center space-x-2">
                                <Frame className="w-6 h-6 text-accent" />
                                <span className="text-xl font-semibold">{logo.title}</span>
                            </Link>
                        </div>
                        <p className="mt-4 text-muted-foreground">{tagline}</p>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx} className="font-medium hover:text-accent transition-colors">
                                            <Link href={link.url}>{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground">
                    <p>{copyright}</p>
                    <ul className="flex gap-4">
                        {bottomLinks.map((link, linkIdx) => (
                            <li key={linkIdx} className="hover:text-accent transition-colors">
                                <Link href={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export { Footer }

