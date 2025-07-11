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
  getVenueByAuthId,
  getVenueByCity,
  getWeddingDate,
  searchVenueByGeoLocation,
} from "@/services/db.service";
import { listAvenueFiles } from "@/services/bucket.service";
import debounce from "lodash.debounce";

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
  const [filterDistance, setFilterDistance] = useState<string>("8000");
  const [filterItems, setFilterItems] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newMatch, setNewMatch] = useState<any>([]);
  const [Loading, setLoading] = useState(false);

  // const filteredMatches = matches.filter(match => {
  //   const matchesSearch = match.coupleNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        match.location.toLowerCase().includes(searchTerm.toLowerCase())

  //   const matchesDistance = filterDistance === "all" ||
  //                          (filterDistance === "5" && match.distance <= 5) ||
  //                          (filterDistance === "10" && match.distance <= 10)

  //   const matchesItems = filterItems === "all" ||
  //                       (filterItems === "florals" && match.items.florals > 0) ||
  //                       (filterItems === "tents" && match.items.tents > 0) ||
  //                       (filterItems === "lounge" && match.items.lounge > 0) ||
  //                       (filterItems === "decor" && match.items.decor > 0)

  //   return matchesSearch && matchesDistance && matchesItems
  // })

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
          // currently we are supporting only search by city we will update further based on the needs
          if (searchTerm) {
            clientVenue = await getVenueByCity(searchTerm);
            clientVenue.filter(
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

            // here we get miles and venue on the radius
            const result = searchVenueData.filter(
              (obj: any) => Boolean(obj.created_by) && obj.created_by != user.id
            );

            // we need to get user profile and image url

            const userObject = await Promise.all(
              result.map(async (detail: any) => {
                /** We need to get user profile details & fetch his image & thier wedding date */

                const profile = await getProfileById(detail.created_by);
                const files = await listAvenueFiles(detail.created_by);
                const weddingDate = await getWeddingDate(detail.created_by);
                return {
                  files,
                  userName: profile[0].full_name,
                  weddingDate: weddingDate[0],
                  distance: detail.distance,
                  address: detail.address,
                  id: detail.created_by,
                };
              })
            );
            setNewMatch(userObject);
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Green Aisle</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/floral-marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Floral Marketplace
            </Link>
            <Link
              href="/vendor-coordination"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Vendors
            </Link>
            <Link
              href="/mood-board"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Mood Board
            </Link>
            <Link
              href="/couple-matching"
              className="text-sm font-medium text-foreground"
            >
              Couple Matching
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    // placeholder="Search couples, venues, locations..."
                    placeholder="Search city..."
                    // value={searchTerm}
                    onChange={(e) => debounceSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Select
                    value={filterDistance}
                    onValueChange={setFilterDistance}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8000">All Distances</SelectItem>
                      <SelectItem value="15">Within 15 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={filterItems} onValueChange={setFilterItems}>
                    <SelectTrigger>
                      <SelectValue placeholder="Item Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="florals">Florals</SelectItem>
                      <SelectItem value="tents">Tents</SelectItem>
                      <SelectItem value="lounge">Lounge</SelectItem>
                      <SelectItem value="decor">Decor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">
                    {newMatch.length} matches found
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Results */}
        
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newMatch.map((match: any) => (
                  <Card
                    key={match.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={match.files[0]}
                        alt={`${match.userName} wedding`}
                        width={400}
                        height={250}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90">
                          {match?.matchedDaysAgo ?? "2"}d ago
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
                              weddingDate={match.weddingDate.date}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {match?.venue ?? ""} {match.address}
                            </span>
                          </div>
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
