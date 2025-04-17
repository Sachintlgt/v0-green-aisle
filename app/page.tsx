import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { HowItWorksSection } from "@/components/how-it-works"
import { SubscriptionTiers } from "@/components/subscription-tiers"
import { Footer } from "@/components/footer"
import { DecorSharingSection } from "@/components/decor-sharing-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Green Aisle</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <DecorSharingSection />
        <HowItWorksSection />
        <SubscriptionTiers />
      </main>

      <Footer />
    </div>
  )
}
