"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/nav-bar";
import { cn } from "@/lib/utils";
import { FreeInputMultiSelect } from "@/components/ui/FreeInputMultiselectui";
import { FileWithPath } from "react-dropzone";
import DropZoneCard from "@/components/dropzone-card";
import AddressAutoFieldEdit from "@/components/address-field-distribution";
import AutoCompleteLocation from "@/components/auto-complete-location";
import { useAuth } from "@/contexts/auth-context";
import { FloralArrangement } from "@/types/db";
import { AddListingINMarketPlace } from "@/services/db.service";
import { uploadClientList } from "@/services/bucket.service";

export default function AddListingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    customTitle: "",
    description: "",
    price: "",
    date: undefined as Date | undefined,
    owner: "",
    features: [] as string[],
  });

  const [location, setLocation] = useState<any>();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  function handleChange(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const listingData: FloralArrangement["Insert"] = {
      title: formData.title === "other" ? formData.customTitle : formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      date_available: formData.date?.toISOString() || new Date().toISOString(),
      location: location.addressLabel + ", " + location.formattedAddress,
      owner_type: formData.owner,
      owner_id: user?.id || "",
      tags: formData.features,
    };
  
    try {
      const data = await AddListingINMarketPlace(listingData);
  
      await Promise.all(
        files.map((file) => uploadClientList(file, data.id))
      );
      return router.replace('/floral-marketplace')
      console.log("Submit Listing:", listingData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  }
  


  return (
    <div className="flex min-h-screen flex-col bg-green-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container max-w-3xl px-4">
          <Card className="p-6 shadow-md space-y-6 bg-white">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-green-600" />
                Add Your Listing
              </h2>
              <p className="text-sm text-muted-foreground">
                Share your floral or wedding items for reuse in the marketplace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Select value={formData.title} onValueChange={(val) => handleChange("title", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floral">Floral</SelectItem>
                    <SelectItem value="decor">Decor</SelectItem>
                    <SelectItem value="tent">Tent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.title === "other" && (
                <div className="space-y-1.5">
                  <Label htmlFor="customTitle">Custom Title</Label>
                  <Input
                    id="customTitle"
                    placeholder="Enter custom listing title"
                    value={formData.customTitle}
                    onChange={(e) => handleChange("customTitle", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe your item"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <AutoCompleteLocation setLocation={setLocation} customPlaceholder="Enter venue location" />
                {location && (
                  <div className="grid gap-2">
                    <AddressAutoFieldEdit location={location} setLocation={setLocation} />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(val) => handleChange("date", val)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="owner">Owner</Label>
                <Select value={formData.owner} onValueChange={(val) => handleChange("owner", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="florist">Florist</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <section>
                <DropZoneCard setFiles={setFiles} onEdit />
              </section>

              <section>
                <FreeInputMultiSelect
                  selected={formData.features}
                  onChange={(val) => handleChange("features", val)}
                  placeholder="Type a feature and press Enter..."
                  label="Add features *"
                />
              </section>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Listing
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
