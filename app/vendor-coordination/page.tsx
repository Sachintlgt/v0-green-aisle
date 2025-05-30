import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Filter } from "lucide-react"
import { VendorCard } from "@/components/vendor-card"

export default function VendorCoordination() {
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
            <Link href="/vendor-coordination" className="text-sm font-medium text-foreground">
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vendor Coordination</h1>
              <p className="text-muted-foreground mt-1">
                Find vendors already booked within a 5-mile radius of your venue.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search vendors..."
                  className="w-full md:w-[200px] lg:w-[300px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="nearby" className="mb-6">
            <TabsList>
              <TabsTrigger value="nearby">Nearby Vendors</TabsTrigger>
              <TabsTrigger value="all">All Vendors</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="nearby" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VendorCard
                  id="vendor-1"
                  name="Blooming Creations"
                  type="Florist"
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.8}
                  reviewCount={42}
                  location="Boston, MA"
                  distance={2.3}
                  bookings={[
                    { date: "June 14, 2025", time: "Full Day" },
                    { date: "June 16, 2025", time: "Morning" },
                  ]}
                />

                <VendorCard
                  id="vendor-2"
                  name="Gourmet Celebrations"
                  type="Caterer"
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.9}
                  reviewCount={78}
                  location="Cambridge, MA"
                  distance={3.1}
                  bookings={[
                    { date: "June 14, 2025", time: "Evening" },
                    { date: "June 16, 2025", time: "Full Day" },
                  ]}
                />

                <VendorCard
                  id="vendor-3"
                  name="Elegant Tents & Events"
                  type="Tent Provider"
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.7}
                  reviewCount={35}
                  location="Somerville, MA"
                  distance={4.2}
                  bookings={[{ date: "June 13-15, 2025", time: "Multi-day" }]}
                />

                <VendorCard
                  id="vendor-4"
                  name="Sound & Light Productions"
                  type="DJ & Lighting"
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.6}
                  reviewCount={51}
                  location="Brookline, MA"
                  distance={2.8}
                  bookings={[
                    { date: "June 14, 2025", time: "Evening" },
                    { date: "June 16, 2025", time: "Evening" },
                  ]}
                />

                <VendorCard
                  id="vendor-5"
                  name="Sweet Celebrations Bakery"
                  type="Cake & Desserts"
                  image="/placeholder.svg?height=400&width=600"
                  rating={4.9}
                  reviewCount={63}
                  location="Newton, MA"
                  distance={4.7}
                  bookings={[{ date: "June 15, 2025", time: "Morning Delivery" }]}
                />

                <VendorCard
                  id="vendor-6"
                  name="Capture the Moment Photography"
                  type="Photographer"
                  image="/placeholder.svg?height=400&width=600"
                  rating={5.0}
                  reviewCount={89}
                  location="Boston, MA"
                  distance={1.5}
                  bookings={[{ date: "June 14, 2025", time: "Full Day" }]}
                />
              </div>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* All vendors would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">View all vendors</p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Favorite vendors would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">You haven't added any favorites yet</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
