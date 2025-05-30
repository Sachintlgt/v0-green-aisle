import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function SubscriptionTiers() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Vendor Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose the Right Plan for Your Business
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Flexible subscription options for vendors of all sizes.
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {/* Free Tier */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Free Tier</CardTitle>
              <CardDescription>Perfect for occasional vendors</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $0<span className="text-base font-normal text-muted-foreground">/year</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>List up to 2 weddings per year</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Basic vendor profile</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Access to the marketplace</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Tier */}
          <Card className="flex flex-col border-green-200 bg-green-50">
            <CardHeader>
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">Popular</div>
              <CardTitle className="text-2xl">Standard Tier</CardTitle>
              <CardDescription>For growing businesses</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $99<span className="text-base font-normal text-muted-foreground">/year</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>List up to 10 weddings per year</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Enhanced vendor profile</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Priority matching with couples</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Analytics dashboard</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe Now</Button>
            </CardFooter>
          </Card>

          {/* Unlimited Tier */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Unlimited Tier</CardTitle>
              <CardDescription>For established vendors</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $249<span className="text-base font-normal text-muted-foreground">/year</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Unlimited wedding listings</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Premium vendor profile</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Featured placement in search results</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Advanced analytics and reporting</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
