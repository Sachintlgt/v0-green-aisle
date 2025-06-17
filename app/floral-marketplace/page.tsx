"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  Search, Filter, Plus } from "lucide-react";
import { FloralCard } from "@/components/floral-card";
import Navbar from "@/components/nav-bar";
import { ProductsDetails } from "@/types/db";
import { useEffect, useState } from "react";
import { GetProducts } from "@/services/db.service";
import { useAuth } from "@/contexts/auth-context";

export default function FloralMarketplace() {
  const [data, setdata] = useState<ProductsDetails[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const data = await GetProducts(user.id);
          console.log(data);
          setdata(data);
        } catch (error: any) {
          alert(error.message ?? "Something wrong with getting products");
        }
      })();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-6 bg-green-50">
        <div className="container">
          {/* Header: Title + Search + Add */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Floral Marketplace
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse and reserve floral arrangements for reuse at your
                wedding.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search arrangements..."
                  className="w-[180px] md:w-[200px] lg:w-[250px] pl-8"
                />
              </div>

              {/* Filter Button */}
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>

              {/* Add Listing Button */}
              <Link href="/add-listing">
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4" />
                  Add Listing
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="available" className="mb-6">
            <TabsList>
              <TabsTrigger value="available">Available Now</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Arrangements</TabsTrigger>
            </TabsList>

            {/* Available Now */}
            <TabsContent value="available" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((val: ProductsDetails) => (
                  <FloralCard
                    key={val.id}
                    id={val.id}
                    title={val.title}
                    description={val.description ?? ""}
                    image={
                      val.images[0] ?? "/placeholder.svg?height=400&width=600"
                    }
                    price={+val.price.toFixed(2)}
                    location={val.location}
                    date="June 15, 2025"
                    owner={val.owner_type === "couple" ? "Couple" : "Vendor"}
                    tags={val?.tags ?? []}
                  />
                ))}

                <FloralCard
                  id="floral-1"
                  title="Elegant Rose Centerpieces"
                  description="Set of 10 centerpieces with white and blush roses, eucalyptus, and baby's breath."
                  image="/placeholder.svg?height=400&width=600"
                  price={350}
                  location="Boston, MA"
                  date="June 15, 2025"
                  owner="Couple"
                  tags={["centerpiece", "roses", "elegant"]}
                />
              </div>
            </TabsContent>

            {/* Upcoming */}
            <TabsContent value="upcoming" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">
                    More arrangements coming soon
                  </p>
                </Card>
              </div>
            </TabsContent>

            {/* All */}
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">View all arrangements</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
