import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, DollarSign, Check } from "lucide-react"

interface SharingOpportunity {
  date: string
  status: string
}

interface TentedVenueCardProps {
  id: string
  name: string
  location: string
  image: string
  capacity: number
  price: number
  sharingOpportunities: SharingOpportunity[]
  amenities: string[]
  description: string
}

export function TentedVenueCard({
  id,
  name,
  location,
  image,
  capacity,
  price,
  sharingOpportunities,
  amenities,
  description,
}: TentedVenueCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {sharingOpportunities.some((opp) => opp.status.includes("Available")) && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sharing Available</Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 text-green-600" />
          {location}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="mr-1 h-4 w-4 text-green-600" />
            <span>Up to {capacity} guests</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            <DollarSign className="mr-1 h-4 w-4 text-green-600" />${price.toLocaleString()}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Sharing Opportunities:</h4>
          {sharingOpportunities.map((opportunity, index) => (
            <div key={index} className="flex items-center text-xs bg-muted p-1.5 rounded">
              <Calendar className="mr-1 h-3.5 w-3.5 text-green-600" />
              <span className="mr-2">{opportunity.date}</span>
              <Badge variant="outline" className="text-xs h-5 px-1">
                {opportunity.status}
              </Badge>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Amenities:</h4>
          <div className="flex flex-wrap gap-1">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-xs">
                <Check className="mr-1 h-3 w-3 text-green-600" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
          <Link href={`/tented-venues/${id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          Check Availability
        </Button>
      </CardFooter>
    </Card>
  )
}
