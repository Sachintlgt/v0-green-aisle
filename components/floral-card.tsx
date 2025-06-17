import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, DollarSign, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FloralCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  location: string
  date: string
  owner: "Vendor" | "Couple" 
  tags: string[]
}

export function FloralCard({ id, title, description, image, price, location, date, owner, tags }: FloralCardProps) {
  // Determine badge color based on owner type
  const getBadgeColor = (owner: string) => {
    switch (owner) {
      case "Vendor":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Couple":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return ""
    }
  }

  const ownerBadgeClass = getBadgeColor(owner)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className={ownerBadgeClass}>
            {owner}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {owner === "Vendor" && "Owned by the Vendor, available for rental"}
                    {owner === "Couple" && "Owned by another couple, available for purchase"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 text-green-600" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4 text-green-600" />
          {date}
        </div>
        <div className="flex items-center text-sm font-medium">
          <DollarSign className="mr-1 h-4 w-4 text-green-600" />${price}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href={`/floral-marketplace/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
