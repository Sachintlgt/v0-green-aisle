"use client";
import { useState, useEffect, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Leaf,
  Heart,
  MapPin,
  Calendar,
  Users,
  Camera,
  Flower2,
  Home,
  Sofa,
  Mail,
  Filter,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  getProfileById,
  getUpcomingWeddings,
  getVenueByAuthId,
  getVenueByCity,
  getWeddingDate,
  searchNearByWedding,
  searchVenueByGeoLocation,
} from "@/services/db.service";
import { listFiles } from "@/services/bucket.service";
import debounce from "lodash.debounce";
import LogoutButton from "@/components/ui/logout-button";
import Navbar from "@/components/nav-bar";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CoupleMatch {
  id: string;
  coupleNames: string;
  weddingDate: string;
  venue: string;
  location: string;
  distance: number;
  items: {
    florals: number;
    tents: number;
    lounge: number;
    decor: number;
  };
  photos: string[];
  email: string;
  matchedDaysAgo: number;
}

// Mock data for demonstration
const mockMatches: CoupleMatch[] = [
  {
    id: "1",
    coupleNames: "Sarah & James",
    weddingDate: "2024-06-15",
    venue: "Garden Pavilion",
    location: "Napa Valley, CA",
    distance: 3.2,
    items: { florals: 12, tents: 2, lounge: 6, decor: 8 },
    photos: ["/placeholder.svg?height=200&width=300"],
    email: "sarah.james@email.com",
    matchedDaysAgo: 2,
  },
  {
    id: "2",
    coupleNames: "Emily & Michael",
    weddingDate: "2024-06-14",
    venue: "Hillside Manor",
    location: "Sonoma, CA",
    distance: 7.8,
    items: { florals: 8, tents: 1, lounge: 4, decor: 15 },
    photos: ["/placeholder.svg?height=200&width=300"],
    email: "emily.michael@email.com",
    matchedDaysAgo: 1,
  },
  {
    id: "3",
    coupleNames: "Lisa & David",
    weddingDate: "2024-06-16",
    venue: "Vineyard Estate",
    location: "St. Helena, CA",
    distance: 5.1,
    items: { florals: 20, tents: 3, lounge: 8, decor: 12 },
    photos: ["/placeholder.svg?height=200&width=300"],
    email: "lisa.david@email.com",
    matchedDaysAgo: 3,
  },
];

export default function CoupleMatchingPage() {
  const { user, signOut } = useAuth();
  const [matches, setMatches] = useState<CoupleMatch[]>(mockMatches);
  const [filterDistance, setFilterDistance] = useState<number>(5);
  const [filterItems, setFilterItems] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newMatch, setNewMatch] = useState<any>([]);
  const [Loading, setLoading] = useState(false);

  const handleContactCouple = (email: string, coupleNames: string) => {
    window.location.href = `mailto:${email}?subject=Green Aisle - Interest in Wedding Items&body=Hi ${coupleNames},%0D%0A%0D%0AI found your wedding items through Green Aisle and would love to discuss potential sharing opportunities for our upcoming wedding.%0D%0A%0D%0ABest regards`;
  };

  const debounceSearchTerm = useCallback(
    debounce(async (query) => {
      setSearchTerm(query);
    }, 500),
    []
  );

  useEffect(() => {
    /**
     * step1; get userProfile,
     */

    (async () => {
      try {
        /** Call The USER Venue and Get longtitude and latitude */
        setLoading(true);
        if (user?.id) {
          let clientVenue = await getVenueByAuthId(user.id);
          let clientWeddingDate = (await getWeddingDate(user.id))[0].date;

          // currently we are supporting only search by city we will update further based on the needs
          if (searchTerm) {
            clientVenue = await getVenueByCity(searchTerm);
            clientVenue = clientVenue.filter(
              (obj: any) => obj.created_by && obj.created_by !== user.id
            );
          }
          if (clientVenue.length) {
            /** Got the latitude and longitude  */
            const searchVenueData = await searchVenueByGeoLocation({
              longitude: clientVenue[0].longitude,
              latitude: clientVenue[0].latitude,
              max_radius_by_miles: +filterDistance,
            });

            const searchWeddingDate = await searchNearByWedding(
              clientVenue[0].longitude,
              clientVenue[0].latitude,
              clientWeddingDate,
              +filterDistance
            );
            console.log({ searchWeddingDate });

            // here we get miles and venue on the radius
            const result = searchVenueData.filter(
              (obj: any) => Boolean(obj.created_by) && obj.created_by != user.id
            );

            function getUpdatedDate(updatedAt: string) {
              const updatedDate = new Date(updatedAt);
              const currentDate = new Date();

              // Reset time to midnight for both dates
              updatedDate.setHours(0, 0, 0, 0);
              currentDate.setHours(0, 0, 0, 0);

              // Calculate the difference in days
              const diffInDays = Math.floor(
                (currentDate.getTime() - updatedDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return diffInDays;
            }

            // we need to get user profile and image url

            const userObject = await Promise.all(
              result.map(async (detail: any) => {
                /** We need to get user profile details & fetch his image & thier wedding date */

                const profile = await getProfileById(detail.created_by);
                const files = await listFiles(detail.created_by, "avenue");
                const weddingDate = await getUpcomingWeddings(
                  detail.created_by,
                  clientWeddingDate
                );
                if (!weddingDate) return null;
                return {
                  files,
                  userName: profile[0].full_name,
                  weddingDate: weddingDate[0],
                  distance: detail.distance,
                  address: detail.address,
                  id: detail.created_by,
                  updatedAt: getUpdatedDate(weddingDate[0].updated_at),
                  description: detail.description,
                };
              })
            );
            console.log(userObject);
            setNewMatch(userObject.filter(Boolean));
          } else {
            setNewMatch([]);
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    })();
  }, [user, filterDistance, searchTerm]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-6 bg-green-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Couple Matching
              </h1>
              <p className="text-muted-foreground mt-1">
                Find couples near your venue and wedding date to share
                sustainable wedding resources.
              </p>
            </div>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Camera className="h-4 w-4" />
              Upload Your Items
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            {/* Header */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Filter className="h-5 w-5 shrink-0" />
                <span>Search & Filter Matches</span>
              </CardTitle>
            </CardHeader>

            {/* Content */}
            <CardContent>
              <form className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
                {/* Distance Slider */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="distance-slider">
                    {filterDistance === 0
                      ? "All distances"
                      : `Within ${filterDistance} miles`}
                  </Label>
                  <Slider
                    id="distance-slider"
                    min={0}
                    max={10}
                    step={1}
                    value={[filterDistance]}
                    onValueChange={([v]) => setFilterDistance(v)}
                    className={cn(
                      "w-full",
                      // Track
                      "[&_[data-orientation=horizontal]]:h-1 [&_[data-orientation=horizontal]]:bg-slate-300",
                      // Filled range
                      "[&_[data-radix-slider-range]]:bg-emerald-600 [&_[data-radix-slider-range]]:shadow-inner",
                      // Thumb
                      "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:drop-shadow"
                    )}
                  />
                </div>


                {/* Match Count */}
                <div className="flex flex-col justify-end">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-emerald-600" />
                    <span>23 matches found</span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Match Results */}

          {Loading ? (
            <div className="w-[70vw] h-[70vh] grid place-items-center ">
              {" "}
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newMatch.map((match: any) => (
                  <Card
                    key={match.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={match.files[0] ?? "/placeholder-image.jpg"}
                        alt={`${match.userName} wedding`}
                        width={400}
                        height={250}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90">
                          {match?.updatedAt === 0
                            ? "Today"
                            : `${match.updatedAt}d ago`}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{match.userName}</span>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          {match.distance.toFixed(1)} miles
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <ClientOnlyDate
                              weddingDate={
                                match?.weddingDate?.date ?? new Date()
                              }
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {match?.venue ?? ""} {match.address}
                            </span>
                          </div>
                          {match?.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {match.description}
                            </p>
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Uncomment this section if you want to show available items and contact button */}
                      {/* 
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Available Items:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {match.items.florals > 0 && (
                    <div className="flex items-center gap-2">
                      <Flower2 className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">{match.items.florals} Florals</span>
                    </div>
                  )}
                  {match.items.tents > 0 && (
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{match.items.tents} Tents</span>
                    </div>
                  )}
                  {match.items.lounge > 0 && (
                    <div className="flex items-center gap-2">
                      <Sofa className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{match.items.lounge} Lounge</span>
                    </div>
                  )}
                  {match.items.decor > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{match.items.decor} Decor</span>
                    </div>
                  )}
                </div>
              </div>
              <Button 
                onClick={() => handleContactCouple(match.email, match.coupleNames)}
                className="w-full"
                variant="outline"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Couple
              </Button>
            </div>
            */}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {newMatch.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No matches found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or check back later for new
                      couples in your area.
                    </p>
                    <Button variant="outline">Clear Filters</Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  How Matching Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    • We match you with couples within 5-10 miles of your venue
                  </li>
                  <li>
                    • Wedding dates are within ±2 days of yours for optimal
                    logistics
                  </li>
                  <li>• Browse available items and contact couples directly</li>
                  <li>• New matches are automatically sent via email alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  Share Your Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload photos of your florals, tents, lounge furniture, and
                  decor to help other couples find you.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Your Wedding Items
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ClientOnlyDate({ weddingDate }: { weddingDate: string }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(weddingDate).toLocaleDateString());
  }, []);
  return <span>{date}</span>;
}
