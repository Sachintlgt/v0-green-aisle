import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Filter, Calendar, MapPin, Users } from "lucide-react"
import { TentedVenueCard } from "@/components/tented-venue-card"
import { CostSharingCalculator } from "@/components/cost-sharing-calculator"
import { AccountCreatedAlert } from "@/components/account-created-alert"
import LogoutButton from "@/components/ui/logout-button"

export default function TentedVenuesPage() {
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
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 bg-green-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Temporary Tented Venues</h1>
              <p className="text-muted-foreground mt-1">
                Explore cost-sharing opportunities with other couples for your wedding venue.
              </p>
              <p className="text-sm text-green-600 mt-1">
                Welcome! Your account is ready to explore and save your favorite venues.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search locations..."
                  className="w-full md:w-[200px] lg:w-[300px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Why Choose a Tented Venue with Cost-Sharing?</h2>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from available dates and share setup costs with other couples.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1">Premium Locations</h3>
                    <p className="text-sm text-muted-foreground">
                      Access beautiful locations that might otherwise be out of budget.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1">Significant Savings</h3>
                    <p className="text-sm text-muted-foreground">
                      Save up to 50% on venue costs by sharing with another couple.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Venues</TabsTrigger>
                  <TabsTrigger value="sharing">With Sharing Opportunities</TabsTrigger>
                  <TabsTrigger value="premium">Premium Locations</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TentedVenueCard
                      id="tent-1"
                      name="Lakeside Gardens"
                      location="Cambridge, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={150}
                      price={5000}
                      sharingOpportunities={[
                        { date: "June 14-16, 2025", status: "Available for sharing" },
                        { date: "July 10-12, 2025", status: "One couple booked" },
                      ]}
                      amenities={["Waterfront views", "Parking", "Power hookups"]}
                      description="Beautiful lakeside setting with open views and space for a large tent. Perfect for spring and summer weddings."
                    />

                    <TentedVenueCard
                      id="tent-2"
                      name="Hilltop Meadows"
                      location="Lexington, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={200}
                      price={6500}
                      sharingOpportunities={[{ date: "May 22-24, 2025", status: "One couple booked" }]}
                      amenities={["Panoramic views", "Bridal suite", "Catering kitchen"]}
                      description="Expansive meadow with stunning views of the countryside. Includes a small cottage for preparations."
                    />

                    <TentedVenueCard
                      id="tent-3"
                      name="Urban Garden Terrace"
                      location="Boston, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={100}
                      price={7500}
                      sharingOpportunities={[{ date: "August 5-7, 2025", status: "Available for sharing" }]}
                      amenities={["City views", "Built-in bar", "String lighting"]}
                      description="Modern rooftop garden in the heart of the city with spectacular skyline views. Perfect for sophisticated urban weddings."
                    />

                    <TentedVenueCard
                      id="tent-4"
                      name="Historic Estate Grounds"
                      location="Concord, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={175}
                      price={8000}
                      sharingOpportunities={[{ date: "September 18-20, 2025", status: "One couple booked" }]}
                      amenities={["Historic mansion access", "Gardens", "Stone patio"]}
                      description="Elegant estate grounds with manicured gardens and access to the historic mansion for photos and cocktail hour."
                    />
                  </div>
                </TabsContent>
                <TabsContent value="sharing" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TentedVenueCard
                      id="tent-1"
                      name="Lakeside Gardens"
                      location="Cambridge, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={150}
                      price={5000}
                      sharingOpportunities={[
                        { date: "June 14-16, 2025", status: "Available for sharing" },
                        { date: "July 10-12, 2025", status: "One couple booked" },
                      ]}
                      amenities={["Waterfront views", "Parking", "Power hookups"]}
                      description="Beautiful lakeside setting with open views and space for a large tent. Perfect for spring and summer weddings."
                    />

                    <TentedVenueCard
                      id="tent-3"
                      name="Urban Garden Terrace"
                      location="Boston, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={100}
                      price={7500}
                      sharingOpportunities={[{ date: "August 5-7, 2025", status: "Available for sharing" }]}
                      amenities={["City views", "Built-in bar", "String lighting"]}
                      description="Modern rooftop garden in the heart of the city with spectacular skyline views. Perfect for sophisticated urban weddings."
                    />
                  </div>
                </TabsContent>
                <TabsContent value="premium" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TentedVenueCard
                      id="tent-3"
                      name="Urban Garden Terrace"
                      location="Boston, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={100}
                      price={7500}
                      sharingOpportunities={[{ date: "August 5-7, 2025", status: "Available for sharing" }]}
                      amenities={["City views", "Built-in bar", "String lighting"]}
                      description="Modern rooftop garden in the heart of the city with spectacular skyline views. Perfect for sophisticated urban weddings."
                    />

                    <TentedVenueCard
                      id="tent-4"
                      name="Historic Estate Grounds"
                      location="Concord, MA"
                      image="/placeholder.svg?height=400&width=600"
                      capacity={175}
                      price={8000}
                      sharingOpportunities={[{ date: "September 18-20, 2025", status: "One couple booked" }]}
                      amenities={["Historic mansion access", "Gardens", "Stone patio"]}
                      description="Elegant estate grounds with manicured gardens and access to the historic mansion for photos and cocktail hour."
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <CostSharingCalculator />

              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-3">How Tent Sharing Works</h3>
                <ol className="space-y-2 text-sm pl-5 list-decimal">
                  <li>Browse available tented venues and dates</li>
                  <li>Select a venue with sharing opportunities</li>
                  <li>Choose your preferred date within the sharing window</li>
                  <li>Connect with other couples or wait for matches</li>
                  <li>Split the costs and coordinate details through our platform</li>
                </ol>
                <div className="mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Learn More About Sharing</Button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-3">Need Help Finding the Perfect Venue?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our venue specialists can help you find the perfect location based on your preferences and budget.
                </p>
                <Button variant="outline" className="w-full">
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AccountCreatedAlert />
    </div>
  )
}
