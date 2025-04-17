import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, MapPin, Users, Calendar, DollarSign, Check, Share2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CostSharingCalculator } from "@/components/cost-sharing-calculator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function TentedVenueDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the venue data based on the ID
  // For this example, we'll use hardcoded data
  const venue = {
    id: params.id,
    name: "Lakeside Gardens",
    location: "Cambridge, MA",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    capacity: 150,
    price: 5000,
    description:
      "Beautiful lakeside setting with open views and space for a large tent. Perfect for spring and summer weddings with stunning sunset views over the water. The venue includes ample parking, power hookups, and a small preparation area.",
    sharingOpportunities: [
      { date: "June 14-16, 2025", status: "Available for sharing" },
      { date: "July 10-12, 2025", status: "One couple booked" },
    ],
    amenities: [
      "Waterfront views",
      "Parking for 75 cars",
      "Power hookups",
      "Restroom facilities",
      "Preparation area",
      "Ceremony arch",
    ],
    tentOptions: [
      {
        name: "Standard Package",
        size: "40' x 60'",
        capacity: 120,
        price: 2500,
        features: ["White tent", "Basic lighting", "Dance floor"],
      },
      {
        name: "Premium Package",
        size: "40' x 80'",
        capacity: 160,
        price: 4000,
        features: ["White tent", "String lighting", "Dance floor", "Chandeliers", "Side walls"],
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Green Aisle</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/floral-marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Floral Marketplace
            </Link>
            <Link
              href="/vendor-coordination"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Vendors
            </Link>
            <Link href="/mood-board" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Mood Board
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image
                src="/placeholder.svg?height=32&width=32"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
              />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 bg-green-50">
        <div className="container">
          <div className="mb-6">
            <Link
              href="/tented-venues"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              ← Back to Tented Venues
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sharing Available</Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {venue.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${venue.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{venue.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4 text-green-600" />
                    {venue.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm">
                      <Users className="mr-1 h-4 w-4 text-green-600" />
                      <span>Up to {venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="mr-1 h-4 w-4 text-green-600" />${venue.price.toLocaleString()} venue rental
                    </div>
                  </div>

                  <p className="text-muted-foreground">{venue.description}</p>

                  <div>
                    <h3 className="font-medium mb-2">Amenities:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {venue.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Check className="mr-1 h-4 w-4 text-green-600" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="sharing">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sharing">Sharing Opportunities</TabsTrigger>
                  <TabsTrigger value="tent">Tent Options</TabsTrigger>
                  <TabsTrigger value="vendors">Recommended Vendors</TabsTrigger>
                </TabsList>
                <TabsContent value="sharing" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Available Sharing Dates</CardTitle>
                      <CardDescription>
                        Share the venue and tent costs with another couple getting married on a consecutive day
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {venue.sharingOpportunities.map((opportunity, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div
                            className={`p-1 ${opportunity.status.includes("Available") ? "bg-green-100" : "bg-amber-100"}`}
                          ></div>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4 text-green-600" />
                                  <span className="font-medium">{opportunity.date}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {opportunity.status}
                                </Badge>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <Share2 className="mr-1 h-4 w-4" />
                                  Share Details
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Reserve Date
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">How Sharing Works</h4>
                        <ol className="space-y-1 text-sm pl-5 list-decimal">
                          <li>Reserve your preferred date within the sharing window</li>
                          <li>The tent remains set up for consecutive events</li>
                          <li>Each couple pays only for their day's venue rental</li>
                          <li>Tent costs are split equally between couples</li>
                          <li>Coordinate details through our platform</li>
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tent" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tent Packages</CardTitle>
                      <CardDescription>Choose from our curated tent options for this venue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {venue.tentOptions.map((option, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{option.name}</CardTitle>
                            <CardDescription>
                              {option.size} - Up to {option.capacity} guests
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Price:</span>
                              <span className="font-medium">${option.price.toLocaleString()}</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm">Includes:</span>
                              <div className="grid grid-cols-2 gap-1">
                                {option.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center text-xs">
                                    <Check className="mr-1 h-3 w-3 text-green-600" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="text-xs text-muted-foreground">
                              {option.price / 2} per couple when shared
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="vendors" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Vendors</CardTitle>
                      <CardDescription>
                        These vendors frequently work at this venue and offer special rates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-8 text-muted-foreground">
                        Vendor information will be available after you reserve a date
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Reserve This Venue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Select a Date</Label>
                    <select id="date" className="w-full p-2 border rounded-md">
                      <option value="">Choose a date...</option>
                      <option value="june-14">June 14, 2025</option>
                      <option value="june-15">June 15, 2025</option>
                      <option value="june-16">June 16, 2025</option>
                      <option value="july-10">July 10, 2025</option>
                      <option value="july-11">July 11, 2025</option>
                      <option value="july-12">July 12, 2025</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sharing-preference">Sharing Preference</Label>
                    <select id="sharing-preference" className="w-full p-2 border rounded-md">
                      <option value="open">Open to sharing (save up to 50%)</option>
                      <option value="specific">Share with specific couple</option>
                      <option value="none">No sharing (full price)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Estimated Guest Count</Label>
                    <Input id="guests" type="number" placeholder="e.g., 100" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Venue Rental</span>
                      <span className="font-medium">${venue.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tent Package (Standard)</span>
                      <span className="font-medium">${venue.tentOptions[0].price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Potential Sharing Savings</span>
                      <span className="font-medium">-$${(venue.tentOptions[0].price / 2).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-medium">
                      <span>Estimated Total</span>
                      <span>${(venue.price + venue.tentOptions[0].price / 2).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Reserve Now</Button>
                </CardFooter>
              </Card>

              <CostSharingCalculator />

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Have Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our venue specialists can help answer any questions about this location or the sharing process.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact a Specialist
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
