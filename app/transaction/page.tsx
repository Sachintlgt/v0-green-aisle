import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Leaf, CreditCard, Truck, Calendar, Clock } from "lucide-react"
import LogoutButton from "@/components/ui/logout-button"

export default function TransactionPage() {
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
              Marketplace
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
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Complete Your Transaction</h1>
            <p className="text-muted-foreground mt-1">
              Secure payment and logistics coordination for your wedding elements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                  <CardDescription>Review the details of your selected item.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative aspect-square w-24 h-24 overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=400&width=400"
                        alt="Elegant Rose Centerpieces"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Elegant Rose Centerpieces</h3>
                      <p className="text-sm text-muted-foreground">
                        Set of 10 centerpieces with white and blush roses, eucalyptus, and baby's breath.
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-green-600" />
                        <span className="mr-3">June 15, 2025</span>
                        <Clock className="mr-1 h-4 w-4 text-green-600" />
                        <span>Available after 8:00 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                  <CardDescription>Choose how you'd like to receive your items.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="delivery">
                    <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <div className="flex-1">
                        <Label htmlFor="delivery" className="font-medium">
                          Delivery Service
                        </Label>
                        <p className="text-sm text-muted-foreground">We'll coordinate delivery to your venue.</p>
                        <div className="mt-2 text-sm flex items-center">
                          <Truck className="mr-1 h-4 w-4 text-green-600" />
                          <span>15% logistics fee applies</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <div className="flex-1">
                        <Label htmlFor="pickup" className="font-medium">
                          Self Pickup
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Pick up the items yourself from the previous venue.
                        </p>
                        <div className="mt-2 text-sm">
                          <p>Boston Harbor Hotel</p>
                          <p>70 Rowes Wharf, Boston, MA 02110</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-notes">Delivery Notes (Optional)</Label>
                    <Input id="delivery-notes" placeholder="Special instructions for delivery or pickup" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Enter your payment details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center font-medium">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit or Debit Card
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span>$350.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (5%)</span>
                    <span>$17.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee (15%)</span>
                    <span>$52.50</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>$420.00</span>
                  </div>

                  <div className="bg-green-50 p-3 rounded-md text-sm">
                    <p className="flex items-center text-green-700">
                      <Leaf className="mr-1 h-4 w-4" />
                      <span className="font-medium">Sustainability Impact:</span>
                    </p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc text-muted-foreground">
                      <li>Saved 10 floral arrangements from waste</li>
                      <li>Reduced carbon emissions by reusing locally</li>
                      <li>Saved approximately 15 gallons of water</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Complete Purchase</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
