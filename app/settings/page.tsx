"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  User,
  Heart,
  CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Save,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/hooks/use-profile";
import Navbar from "@/components/nav-bar";
import { Wedding } from "@/types/db";
import { getWedding, updateWedding } from "@/services/db.service";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const [wedding, setWedding] = useState<Wedding['Row'] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  // const { wedding, loading: weddingLoading, updateWedding } = useWedding();

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    location: "",
  });

  // Wedding form state
  const [weddingForm, setWeddingForm] = useState({
    date: undefined as Date | undefined,
    guest_count: "",
    budget: "",
    general_location: "",
    is_exploring_venues: false,
  });

  // Loading and success states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingWedding, setIsUpdatingWedding] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [weddingSuccess, setWeddingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);




  // Load initial data
  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    }
  }, [profile]);
  useEffect(()=>{
    if(user?.id ){
      (async()=>{ 
        let data  = await getWedding( user.id)
        setWedding(data)
      })()
    }
  },[user])

  useEffect(() => {
    if (wedding) {
      setWeddingForm({
        date: wedding.date ? new Date(wedding.date) : undefined,
        guest_count: wedding.guest_count?.toString() || "",
        budget: wedding.budget?.toString() || "",
        general_location: wedding.general_location || "",
        is_exploring_venues: wedding.is_exploring_venues || false,
      });
    }
    
  }, [wedding]);

  const handleProfileUpdate = async () => {
    setIsUpdatingProfile(true);
    setError(null);
    setProfileSuccess(false);

    try {
      const { error } = await updateProfile(profileForm);
      if (error) throw error;
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleWeddingUpdate = async () => {
    if (!wedding) return;
    setLoading(true);
    setIsUpdatingWedding(true);
    setError(null);
    setWeddingSuccess(false);

    try {
      const data = await updateWedding({
        date: weddingForm.date?.toISOString() || null,
        guest_count: weddingForm.guest_count
          ? parseInt(weddingForm.guest_count)
          : null,
        budget: weddingForm.budget ? parseFloat(weddingForm.budget) : null,
        general_location: weddingForm.general_location || null,
        is_exploring_venues: weddingForm.is_exploring_venues,
      }, wedding.id);
      setWedding(data);
      setWeddingSuccess(true);
      setTimeout(() => setWeddingSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update wedding details",
      );
    } finally {
      setIsUpdatingWedding(false);
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
     <Navbar/>

      <main className="flex-1 py-6 bg-green-50">
        <div className="container max-w-4xl">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="wedding" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wedding Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={user.email || ""}
                            disabled
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Email address cannot be changed. Contact support if
                            needed.
                          </p>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={profileForm.full_name}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                full_name: e.target.value,
                              })
                            }
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                phone: e.target.value,
                              })
                            }
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileForm.location}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                location: e.target.value,
                              })
                            }
                            placeholder="Enter your city, state"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        {profileSuccess && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">
                              Profile updated successfully!
                            </span>
                          </div>
                        )}
                        <div className="ml-auto">
                          <Button
                            onClick={handleProfileUpdate}
                            disabled={isUpdatingProfile}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isUpdatingProfile ? "Updating..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wedding">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Wedding Details
                  </CardTitle>
                  <CardDescription>
                    Update your wedding planning information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : !wedding ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No wedding details found. Complete the onboarding
                        process to add wedding information.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="exploring-venues">
                            Still exploring venue options
                          </Label>
                          <Switch
                            id="exploring-venues"
                            checked={weddingForm.is_exploring_venues}
                            onCheckedChange={(checked) =>
                              setWeddingForm({
                                ...weddingForm,
                                is_exploring_venues: checked,
                              })
                            }
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Wedding Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !weddingForm.date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {weddingForm.date
                                  ? format(weddingForm.date, "PPP")
                                  : "Select wedding date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={weddingForm.date}
                                onSelect={(date) =>
                                  setWeddingForm({ ...weddingForm, date })
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="wedding_location">
                            Wedding Location
                          </Label>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="wedding_location"
                              value={weddingForm.general_location}
                              onChange={(e) =>
                                setWeddingForm({
                                  ...weddingForm,
                                  general_location: e.target.value,
                                })
                              }
                              placeholder="Enter city, state or venue name"
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="guest_count">Guest Count</Label>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="guest_count"
                              type="number"
                              value={weddingForm.guest_count}
                              onChange={(e) =>
                                setWeddingForm({
                                  ...weddingForm,
                                  guest_count: e.target.value,
                                })
                              }
                              placeholder="Estimated number of guests"
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="budget">Wedding Budget</Label>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="budget"
                              type="number"
                              value={weddingForm.budget}
                              onChange={(e) =>
                                setWeddingForm({
                                  ...weddingForm,
                                  budget: e.target.value,
                                })
                              }
                              placeholder="Total wedding budget"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        {weddingSuccess && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">
                              Wedding details updated successfully!
                            </span>
                          </div>
                        )}
                        <div className="ml-auto">
                          <Button
                            onClick={handleWeddingUpdate}
                            disabled={isUpdatingWedding}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {isUpdatingWedding ? "Updating..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* <div className="mt-8">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  These actions are permanent and cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </main>
    </div>
  );
}
