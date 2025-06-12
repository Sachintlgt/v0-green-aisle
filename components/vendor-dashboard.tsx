"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  DollarSign,
  Users,
  Settings,
  CreditCard,
  AlertCircle,
  CheckCircle,
  BarChart3,
  MessageCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useVendorStatus } from "@/hooks/use-vendor-status";

export default function VendorDashboard() {
  const router = useRouter();
  const { vendor, hasStripeAccount, stripeOnboardingComplete, loading } = useVendorStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your vendor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {vendor?.business_name || 'Vendor'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your bookings, payments, and grow your sustainable wedding business.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.push("/settings")}
        >
          <Settings className="h-4 w-4" />
          Account Settings
        </Button>
      </div>

      {/* Stripe Setup Alert */}
      {!stripeOnboardingComplete && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            {!hasStripeAccount ? (
              <>
                Complete your payment setup to start receiving payments from couples.{" "}
                <Link 
                  href="/vendor-stripe-setup" 
                  className="font-medium underline hover:no-underline"
                >
                  Set up payments now
                </Link>
              </>
            ) : (
              <>
                Finish your Stripe account setup to start receiving payments.{" "}
                <Link 
                  href="/vendor-stripe-setup" 
                  className="font-medium underline hover:no-underline"
                >
                  Complete setup
                </Link>
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Couples</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently working with</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {stripeOnboardingComplete ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Active</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Setup Required</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Bookings</CardTitle>
                <CardDescription>
                  View and manage your upcoming wedding bookings and availability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Booking calendar"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Calendar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Floral Marketplace</CardTitle>
                <CardDescription>
                  List your floral arrangements for reuse and coordinate with couples.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Floral arrangements"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <Button asChild className="w-full">
                  <Link href="/floral-marketplace">Manage Listings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Couple Coordination</CardTitle>
                <CardDescription>
                  Connect with couples planning weddings near your existing bookings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Couple coordination"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <Button asChild className="w-full">
                  <Link href="/vendor-coordination">Find Couples</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/analytics")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Analytics
                  </CardTitle>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Track your business performance and revenue trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Monthly revenue growth
                  </span>
                  <Badge className="bg-green-100 text-green-800">+15%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/messages")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    Messages
                  </CardTitle>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Chat with couples about arrangements and coordination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    3 unread messages
                  </span>
                  <Badge variant="destructive">3</Badge>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/contracts")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Contracts
                  </CardTitle>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Manage contracts and agreements with couples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    2 pending signatures
                  </span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                Your scheduled wedding events and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Booking management interface would go here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>
                Track your performance and revenue trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics dashboard would go here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Management</CardTitle>
              <CardDescription>
                Manage your floral arrangements and other offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Marketplace management interface would go here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
