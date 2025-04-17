import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Star } from "lucide-react"

interface Booking {
  date: string
  time: string
}

interface VendorCardProps {
  id: string
  name: string
  type: string
  image: string
  rating: number
  reviewCount: number
  location: string
  distance: number
  bookings: Booking[]
}

export function VendorCard({
  id,
  name,
  type,
  image,
  rating,
  reviewCount,
  location,
  distance,
  bookings,
}: VendorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{type}</Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-sm font-medium">{rating}</span>
          <span className="ml-1 text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 text-green-600" />
          {location} • {distance} miles away
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1">Already booked for:</h4>
          <div className="space-y-1">
            {bookings.map((booking, index) => (
              <div key={index} className="flex items-center text-xs bg-muted p-1.5 rounded">
                <Calendar className="mr-1 h-3.5 w-3.5 text-green-600" />
                <span className="mr-2">{booking.date}</span>
                <Clock className="mr-1 h-3.5 w-3.5 text-green-600" />
                <span>{booking.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href={`/vendor-coordination/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
