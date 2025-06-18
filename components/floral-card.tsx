"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, DollarSign, Info, MapPin } from "lucide-react";

export interface FloralCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  original_price?: number ;
  location: string;
  date: string;
  owner: "Vendor" | "Couple";
  tags: string[];
  owner_name?: string | null;
}

export function FloralCard({
  id,
  title,
  description,
  image,
  price,
  original_price,
  location,
  date,
  owner,
  tags,
  owner_name,
}: FloralCardProps) {
  // Decide badge colour on owner type
  const getBadgeColor = (o: "Vendor" | "Couple") =>
    o === "Vendor"
      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
      : "bg-purple-100 text-purple-800 hover:bg-purple-100";

  const router = useRouter();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {/* ——— Image ——— */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getBadgeColor(owner)}>
            {owner}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="ml-1 h-3.5 w-3.5 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {owner === "Vendor"
                      ? "Owned by the vendor, available for rental"
                      : "Owned by another couple, available for purchase"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Badge>
        </div>
      </div>

      {/* ——— Title & Owner ——— */}
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        {/* owner name just under the title */}
        <p className="text-sm text-muted-foreground mb-1">by {owner_name}</p>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      {/* ——— Details ——— */}
      <CardContent className="space-y-2 p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 text-green-600" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4 text-green-600" />
          {date}
        </div>

        {/* price, label, and (optionally) original price */}
        <div className="flex flex-wrap items-center text-sm font-medium">
          <DollarSign className="mr-1 h-4 w-4 text-green-600" />
          <span className="mr-1">Price available at:</span>
          <span>${price}</span>
          {!!original_price && (
            <span className="ml-2 text-xs text-muted-foreground line-through">
              Originally costed: ${original_price}
            </span>
          )}
        </div>

        {/* tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* ——— Footer / CTA ——— */}
      <CardFooter className="p-4 pt-0">
        <Button
          disabled
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-500 disabled:cursor-not-allowed"
          onClick={() => router.push(`/floral-marketplace/${id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
