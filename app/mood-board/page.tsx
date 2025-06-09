import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Filter, Plus, Grid, Columns } from "lucide-react"
import { MoodBoardGallery } from "@/components/mood-board-gallery"
import LogoutButton from "@/components/ui/logout-button"
import Navbar from "@/components/nav-bar"

export default function MoodBoard() {
  return (
    <div className="flex min-h-screen flex-col">
     <Navbar/>

      <main className="flex-1 py-6 bg-green-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mood Board</h1>
              <p className="text-muted-foreground mt-1">
                Save and compare designs from previous weddings for inspiration.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search designs..."
                  className="w-full md:w-[200px] lg:w-[300px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button variant="outline" className="flex gap-1">
                <Grid className="h-4 w-4" />
                <Columns className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="explore" className="mb-6">
            <TabsList>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="my-boards">My Boards</TabsTrigger>
            </TabsList>
            <TabsContent value="explore" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-3 p-4 bg-green-100 border-green-200">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Create Your Own Mood Board</h3>
                      <p className="text-sm text-muted-foreground">
                        Collect and organize your favorite designs in one place.
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" /> Create New Board
                    </Button>
                  </div>
                </Card>

                <MoodBoardGallery />
              </div>
            </TabsContent>
            <TabsContent value="saved" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Saved items would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">You haven't saved any items yet</p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="my-boards" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User's mood boards would go here */}
                <Card className="flex items-center justify-center h-64 border-dashed">
                  <p className="text-muted-foreground">You haven't created any boards yet</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
