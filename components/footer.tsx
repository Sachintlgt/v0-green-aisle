import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <span className="text-lg font-semibold">Green Aisle</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            About Us
          </Link>
          <Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="text-xs sm:text-sm text-muted-foreground">© 2025 Green Aisle. All rights reserved.</div>
      </div>
    </footer>
  )
}
