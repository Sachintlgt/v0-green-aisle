import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Flower2, PaintBucket, TruckIcon } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for a Sustainable Wedding
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to coordinate with vendors, reuse floral arrangements, and plan your perfect
              day with sustainability in mind.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Vendor Coordination</CardTitle>
              <CardDescription>
                Find vendors already booked in your area for the day before or after your wedding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easily connect with vendors who are already servicing events near your venue, reducing transportation
                emissions and costs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Flower2 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Floral Reuse System</CardTitle>
              <CardDescription>Coordinate the reuse of beautiful floral arrangements between weddings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our system tracks ownership, permissions, and availability to ensure smooth transitions between events.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <PaintBucket className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Community Decor Sharing</CardTitle>
              <CardDescription>Connect with couples planning weddings at the same venue or weekend.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unlike generic platforms, Green Aisle helps you discover and collaborate with couples who share your
                venue or date, enabling resource sharing and significant cost savings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TruckIcon className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Logistics Management</CardTitle>
              <CardDescription>Seamless coordination of pickups, deliveries, and transfers.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform handles all the logistics details so you can focus on enjoying your special day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Couple-to-Couple Marketplace</CardTitle>
              <CardDescription>Direct transactions between couples with minimal fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Save money while reducing waste through our secure marketplace with just a 5% transaction fee.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Location-Based Matching</CardTitle>
              <CardDescription>Find matches within a 5-mile radius of your venue.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our smart matching system finds the most convenient and sustainable options near your wedding location.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
