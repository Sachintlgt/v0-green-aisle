import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Filter } from "lucide-react"
import { FloralCard } from "@/components/floral-card"
import LogoutButton from "@/components/ui/logout-button"

export default function FloralMarketplace() {
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
            <Link href="/floral-marketplace" className="text-sm font-medium text-foreground">
              Floral Marketplace
            </Link>
            <Link href="/vendors" className="text-sm font-medium text-muted-foreground hover:text-foreground">
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
              <h1 className="text-3xl font-bold tracking-tight">Floral Marketplace</h1>
              <p className="text-muted-foreground mt-1">
                Browse and reserve floral arrangements for reuse at your wedding.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search arrangements..."
                  className="w-full md:w-[200px] lg:w-[300px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="available" className="mb-6">
            <TabsList>
              <TabsTrigger value="available">Available Now</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Arrangements</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FloralCard
                  id="floral-1"
                  title="Elegant Rose Centerpieces"
                  description="Set of 10 centerpieces with white and blush roses, eucalyptus, and baby's breath."
                  image="/placeholder.svg?height=400&width=600"
                  price={350}
                  location="Boston, MA"
                  date="June 15, 2025"
                  owner="Florist"
                  tags={["centerpiece", "roses", "elegant"]}
                />

                <FloralCard
                  id="floral-2"
                  title="Rustic Wildflower Collection"
                  description="15 mason jar arrangements with seasonal wildflowers and greenery."
                  image="/placeholder.svg?height=400&width=600"
                  price={275}
                  location="Cambridge, MA"
                  date="June 16, 2025"
                  owner="Couple"
                  tags={["wildflowers", "rustic", "mason jar"]}
                />

                <FloralCard
                  id="floral-3"
                  title="Tropical Paradise Arrangements"
                  description="8 large arrangements featuring birds of paradise, orchids, and tropical greenery."
                  image="/placeholder.svg?height=400&width=600"
                  price={420}
                  location="Somerville, MA"
                  date="June 17, 2025"
                  owner="Shared"
                  tags={["tropical", "colorful", "statement"]}
                />

                <FloralCard
                  id="floral-4"
                  title="Minimalist Greenery Garlands"
                  description="200ft of eucalyptus and olive branch garlands for table runners or arch decoration."
                  image="/placeholder.svg?height=400&width=600"
                  price={300}
                  location="Brookline, MA"
                  date="June 18, 2025"
                  owner="Florist"
                  tags={["greenery", "garland", "minimalist"]}
                />

                <FloralCard
                  id="floral-5"
                  title="Romantic Peony Bouquets"
                  description="Bridal bouquet and 4 bridesmaid bouquets with peonies, garden roses, and ranunculus."
                  image="/placeholder.svg?height=400&width=600"
                  price={225}
                  location="Newton, MA"
                  date="June 19, 2025"
                  owner="Couple"
                  tags={["bouquet", "peonies", "romantic"]}
                />

                <FloralCard
                  id="floral-6"
                  title="Bohemian Dried Flower Installation"
                  description="Large hanging installation with pampas grass, dried palms, and preserved flowers."
                  image="/placeholder.svg?height=400&width=600"
                  price={550}
                  location="Medford, MA"
                  date="June 20, 2025"
                  owner="Shared"
                  tags={["dried", "installation", "bohemian"]}
                />
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Upcoming floral arrangements would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">More arrangements coming soon</p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* All floral arrangements would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">View all arrangements</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
