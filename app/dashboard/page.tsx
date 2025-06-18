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
import {
  Leaf,
  Calendar,
  Flower2,
  Users,
  Settings,
  Heart,
  ChevronRight,
  MessageCircle,
  FileText,
  Loader2,
} from "lucide-react";
import LogoutButton from "@/components/ui/logout-button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Navbar from "@/components/nav-bar";
import VendorDashboard from "@/components/vendor-dashboard";
import { useVendorStatus } from "@/hooks/use-vendor-status";

export default function Dashboard() {
  const router = useRouter();
  const { isVendor, loading } = useVendorStatus();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-6 bg-green-50 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading dashboard...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-6 bg-green-50">
        {isVendor ? (
          <VendorDashboard />
        ) : (
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to Green Aisle
              </h1>
              <p className="text-muted-foreground mt-1">
                Your sustainable wedding planning journey starts here.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Complete Your Wedding Profile</CardTitle>
                <CardDescription>
                  Finish setting up your profile to get personalized
                  recommendations and connect with vendors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wedding Details</h3>
                      <p className="text-xs text-muted-foreground">
                        Set your date and venue
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Flower2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Style Preferences</h3>
                      <p className="text-xs text-muted-foreground">
                        Define your wedding style
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Guest Information</h3>
                      <p className="text-xs text-muted-foreground">
                        Add your guest count and details
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Explore Tented Venues</CardTitle>
                    <CardDescription>
                      Discover temporary tented venues with cost-sharing
                      opportunities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Tented venue"
                        width={600}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Link href="/tented-venues">Browse Venues</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Find Vendors</CardTitle>
                    <CardDescription>
                      Connect with vendors already booked near your venue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Wedding vendors"
                        width={600}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/vendor-coordination">Find Vendors</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Marketplace</CardTitle>
                    <CardDescription>
                      Browse and reserve reusable floral arrangements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Couple matching"
                        width={600}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/match">Browse Florals</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push("/match")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-600" />
                        Couple Matching
                      </CardTitle>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>
                      Find couples with similar wedding dates and locations for
                      resource sharing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        3 new matches
                      </span>
                      <Badge variant="secondary">Active</Badge>
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
                      Chat with other couples and vendors about arrangements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        2 unread messages
                      </span>
                      <Badge variant="destructive">2</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push("/agreements")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Agreements
                      </CardTitle>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>
                      Manage contracts and agreements with vendors and other
                      couples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        1 pending signature
                      </span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center py-8 text-muted-foreground">
                    Complete your wedding details to view your planning timeline
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="budget" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center py-8 text-muted-foreground">
                    Set up your budget to track expenses and savings
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sustainability" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center py-8 text-muted-foreground">
                    Track your sustainability impact as you plan your wedding
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        )}
      </main>
    </div>
  );
}
