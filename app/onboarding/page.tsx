"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  Leaf,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import { userSignUp } from "@/services/auth.service";
import { Checkbox } from "@/components/ui/checkbox";
import DropZoneCard from "@/components/dropzone-card";
import AutoCompleteLocation from "@/components/auto-complete-location";
import { FileWithPath } from "react-dropzone";
import { uploadAvenueToBucket } from "@/services/bucket.service";
import { addVenue } from "@/services/db.service";
import { AddVenueParams } from "@/types/db";
import AddressAutoFieldEdit from "@/components/address-field-distribution";

export default function OnboardingPage() {
  const router = useRouter();
  const { signUp, user, setTriggerAuthUseEffect } = useAuth();
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"couple" | "vendor">("couple");
  const [exploringVenues, setExploringVenues] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [isTented, setIsTented] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState("");
  const [files, setFiles] = useState<FileWithPath[]>([]);

  // Account information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Business information (for vendors)
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("florist");
  const [serviceArea, setServiceArea] = useState("");

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Validation states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    location?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateStep2 = () => {
    const newErrors: {
      name?: string;
      email?: string;
      location?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // if (!exploringVenues && !location.trim()) {
    //   newErrors.location = "Location is required when not exploring venues"
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 2 && !validateStep2()) {
      return;
    }

    if (step === 3 && !validateStep3()) {
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleCreateAccount = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);
    setFormError(null);
    setTriggerAuthUseEffect((prev) => !prev);
    let full_location = location.addressLabel+", "+location.formattedAddress

    try {
      await userSignUp({
        signUp,
        email,
        password,
        userType,
        name,
        location: full_location,
      });

      const userId = (await supabase.auth.getUser()).data.user?.id;

      // 3. If user is a couple, create a wedding record
      if (userType === "couple") {

        let venueObject: AddVenueParams = {
          formattedAddress: location.formattedAddress,
          lat: location.latitude,
          long: location.longitude,
          country: location.country,
          state: location.state,
          city: location.city,
          addresslabel: location.addressLabel,
          capacity: +guestCount,
          is_tented: isTented,
          created_by: userId as string,
        };
        const venueData = await addVenue(venueObject);

        const { error: weddingError } = await supabase.from("weddings").insert({
          couple_id: userId,
          date: date ? date.toISOString() : null,
          guest_count: guestCount ? Number.parseInt(guestCount) : null,
          is_exploring_venues: exploringVenues,
          general_location: full_location || null,
          status: "planning",
          venue_id: venueData[0].id,
        });

        if (weddingError) throw weddingError;
      }

      // if couple where not exploring then only they can create the venue
      // if(!exploringVenues){

      // }

      // 4. If user is a vendor, create a vendor record
      if (userType === "vendor") {
        const { error: vendorError } = await supabase.from("vendors").insert({
          user_id: userId,
          business_name: businessName,
          business_type: businessType,
          service_area: location.addressLabel,
          subscription_tier: "free",
          address: location.formattedAddress,
          latitude: location.latitude,
          longitude: location.longitude,
          country: location.country,
          state: location.state,
          city: location.city,
          zip: "07086",
        });

        if (vendorError) throw vendorError;
      }
      if (userId) {
        files.map(async (file) => await uploadAvenueToBucket(file, userId));
      }

      // Redirect to appropriate page based on user selection
      if (userType === "vendor") {
        // Redirect vendors to subscription plans first
        router.push("/subscription-plans");
      } else if (exploringVenues) {
        router.push("/tented-venues");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "An error occurred during account creation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Green Aisle</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-24 bg-green-50">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Get Started with Green Aisle
            </h1>
            <p className="text-muted-foreground mt-2">
              Tell us about your wedding plans so we can help you create a
              sustainable celebration.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 1
                      ? "bg-green-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-12 ${
                    step >= 2 ? "bg-green-600" : "bg-muted"
                  }`}
                />
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 2
                      ? "bg-green-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <div
                  className={`h-1 w-12 ${
                    step >= 3 ? "bg-green-600" : "bg-muted"
                  }`}
                />
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 3
                      ? "bg-green-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>

          {formError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Card>
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>I am a...</CardTitle>
                  <CardDescription>
                    Let us know how you'll be using Green Aisle.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    defaultValue={userType}
                    onValueChange={(value) =>
                      setUserType(value as "couple" | "vendor")
                    }
                  >
                    <TabsList className="griLabeld w-full grid-cols-2">
                      <TabsTrigger value="couple">
                        Couple Planning a Wedding
                      </TabsTrigger>
                      <TabsTrigger value="vendor">Wedding Vendor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="couple" className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <p>As a couple, you can:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Find vendors already booked near your venue</li>
                          <li>
                            Browse and reserve reusable floral arrangements
                          </li>
                          <li>Create mood boards from previous weddings</li>
                          <li>
                            Coordinate with other couples for sustainable
                            sharing
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="vendor" className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <p>As a vendor, you can:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>List your services and availability</li>
                          <li>
                            Coordinate with multiple couples for back-to-back
                            events
                          </li>
                          <li>Manage floral arrangements for reuse</li>
                          <li>Showcase your sustainable wedding designs</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>
                    {userType === "couple"
                      ? "Wedding Details & Account"
                      : "Business Information & Account"}
                  </CardTitle>
                  <CardDescription>
                    {userType === "couple"
                      ? "Tell us about your wedding plans and create your account."
                      : "Tell us about your wedding business and create your account."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium">Your Account Information</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {userType === "couple" ? (
                    <>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="exploring-venues">
                            I'm still exploring venue options
                          </Label>
                          <Switch
                            id="exploring-venues"
                            checked={exploringVenues}
                            onCheckedChange={setExploringVenues}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {exploringVenues
                            ? "Explore temporary tented venues with cost-sharing opportunities."
                            : "Toggle this if you haven't finalized your venue yet."}
                        </p>
                      </div>

                      {!exploringVenues ? (
                        <>
                          <div className="grid gap-2">
                            <Label htmlFor="wedding-date">Wedding Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Select your wedding date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="grid gap-2">
                            {/* <Label htmlFor="location">Wedding Location</Label> */}
                            <AutoCompleteLocation setLocation={setLocation} />
                          </div>
                          {location && (
                            <div className="grid gap-2">
                              <AddressAutoFieldEdit
                                location={location}
                                setLocation={setLocation}
                              />
                            </div>
                          )}
                          <div className="flex">
                            <Checkbox
                              id="tented"
                              checked={isTented}
                              onCheckedChange={(checked) => {
                                setIsTented(checked === true);
                              }}
                              className="bg-white border border-gray-400"
                            />
                            <Label
                              htmlFor="tented"
                              className="pl-2 inline-block"
                            >
                              Whether the venue is tented?{" "}
                              <span className="text-red-700">*</span>
                            </Label>
                          </div>
                          {isTented && (
                            <>
                              <DropZoneCard setFiles={setFiles} />
                            </>
                          )}
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            {/* <Label htmlFor="general-location">General Location</Label>
                            <Input
                              id="general-location"
                              placeholder="Enter city or region to explore"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            /> */}
                            <AutoCompleteLocation setLocation={setLocation} />
                          </div>
                          {location && (
                            <div className="grid gap-2">
                              <AddressAutoFieldEdit
                                location={location}
                                setLocation={setLocation}
                              />
                            </div>
                          )}

                          <Card className="bg-green-50 border-green-200">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">
                                Explore Tented Venue Options
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-3">
                                Discover temporary tented venues with
                                cost-sharing opportunities. Share expenses with
                                other couples getting married around the same
                                time.
                              </p>
                              <Alert className="bg-green-100 border-green-200 mb-3">
                                <AlertCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800 text-xs">
                                  Complete your account setup to browse
                                  available tented venues
                                </AlertDescription>
                              </Alert>
                            </CardContent>
                          </Card>
                        </div>
                      )}

                      <div className="grid gap-2">
                        <Label htmlFor="guests">Estimated Guest Count</Label>
                        <Input
                          id="guests"
                          type="number"
                          placeholder="e.g., 100"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          placeholder="Your business name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="business-type">Business Type</Label>
                        <RadioGroup
                          defaultValue="florist"
                          value={businessType}
                          onValueChange={setBusinessType}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="florist" id="florist" />
                            <Label htmlFor="florist">Florist</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="caterer" id="caterer" />
                            <Label htmlFor="caterer">Caterer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="venue" id="venue" />
                            <Label htmlFor="venue">Venue</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="service-area">Service Area</Label>
                        {/* <Input
                          id="service-area"
                          placeholder="City, state or region"
                          value={serviceArea}
                          onChange={(e) => setServiceArea(e.target.value)}
                        /> */}
                        <AutoCompleteLocation setLocation={setLocation} />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Complete Your Account</CardTitle>
                  <CardDescription>
                    Set a password to secure your Green Aisle account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-medium">Account Information</h3>
                    </div>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Name:</span> {name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {email}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={handleCreateAccount}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
