import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
              Sustainable Wedding Planning
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Reuse, Reduce, and Celebrate Sustainably
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Green Aisle connects couples to share and reuse wedding elements, reducing waste and costs while creating
              beautiful celebrations.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/onboarding">Plan Your Wedding</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/browse">Browse Available Setups</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Sustainable wedding setup with reused floral arrangements"
              width={1280}
              height={720}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
