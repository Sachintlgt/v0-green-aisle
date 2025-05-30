import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Plus, Bookmark } from "lucide-react"

export function MoodBoardGallery() {
  const inspirationItems = [
    {
      id: "insp-1",
      title: "Rustic Garden Wedding",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["rustic", "garden", "outdoor"],
      likes: 245,
      location: "Lakeside Gardens, Boston",
      date: "June 15-16, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-2",
      title: "Minimalist Greenery",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["minimalist", "greenery", "modern"],
      likes: 189,
      location: "Urban Loft, Cambridge",
      date: "July 8-9, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-3",
      title: "Bohemian Sunset Celebration",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["bohemian", "sunset", "colorful"],
      likes: 312,
      location: "Hilltop Vineyard, Lexington",
      date: "August 22-23, 2025",
      sharingAvailable: false,
    },
    {
      id: "insp-4",
      title: "Elegant Ballroom Setup",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["elegant", "ballroom", "formal"],
      likes: 276,
      location: "Grand Hotel, Boston",
      date: "September 5-6, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-5",
      title: "Coastal Beach Wedding",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["beach", "coastal", "blue"],
      likes: 203,
      location: "Oceanside Resort, Cape Cod",
      date: "July 15-16, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-6",
      title: "Vintage Garden Party",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["vintage", "garden", "tea party"],
      likes: 178,
      location: "Historic Estate, Concord",
      date: "June 29-30, 2025",
      sharingAvailable: false,
    },
    {
      id: "insp-7",
      title: "Industrial Chic Loft",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["industrial", "urban", "modern"],
      likes: 156,
      location: "Warehouse District, Somerville",
      date: "August 12-13, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-8",
      title: "Enchanted Forest Theme",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["forest", "enchanted", "magical"],
      likes: 289,
      location: "Woodland Gardens, Newton",
      date: "September 19-20, 2025",
      sharingAvailable: true,
    },
    {
      id: "insp-9",
      title: "Tropical Paradise",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["tropical", "colorful", "exotic"],
      likes: 231,
      location: "Botanical Gardens, Cambridge",
      date: "July 22-23, 2025",
      sharingAvailable: false,
    },
  ]

  return (
    <>
      {inspirationItems.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <div className="relative">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={800}
              height={600}
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200"></div>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="sr-only">Like</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add to board</span>
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <div className="text-xs text-muted-foreground mt-1 mb-1">
                  <span>{item.location}</span> • <span>{item.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Heart className="h-3 w-3 fill-rose-500 text-rose-500 mr-1" />
                  {item.likes}
                </div>
                {item.sharingAvailable && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Sharing Available</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
