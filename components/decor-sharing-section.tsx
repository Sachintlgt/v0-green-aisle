import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, DollarSign, Leaf } from "lucide-react"

export function DecorSharingSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
              Unique to Green Aisle
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Connect, Share, and Save Together
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our community-driven approach transforms wedding planning from an individual journey to a
              collaborative experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Wedding decor setup"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100">
                    June 15
                  </Badge>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Wedding floral arrangement"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100">
                    June 16
                  </Badge>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Wedding table setting"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100">
                    Same Venue
                  </Badge>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Wedding arch decoration"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Shared Items
                  </Badge>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
              <div className="bg-green-100 rounded-full p-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Not Just Another Mood Board Platform</h3>
            <p className="text-muted-foreground">
              While Pinterest helps you collect ideas, Green Aisle connects you with real couples planning weddings at
              your venue or on your weekend, creating opportunities for collaboration and resource sharing.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Location-Based Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with couples planning weddings at the same venue or within a 5-mile radius, making decor
                    sharing logistically feasible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Significant Cost Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Split the cost of expensive decor items, floral arrangements, and rentals with other couples,
                    reducing your wedding budget by up to 40%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Sustainable Celebrations</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce waste by reusing decor elements across multiple weddings, making your special day both
                    beautiful and environmentally responsible.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/onboarding">
                  Connect With Couples Near You <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
