import React, { useEffect, useState } from "react";
import DropZoneCard from "./dropzone-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FreeInputMultiSelect } from "./ui/FreeInputMultiselectui";
import { TentedPackage } from "@/types/db";

function TentPackage({
  setFiles,
  setTentPackageData,
  tentedPackage,
}: {
  setFiles: React.Dispatch<React.SetStateAction<any>>;
  setTentPackageData: React.Dispatch<
    React.SetStateAction<Partial<TentedPackage["Row"]> | null>
  >;
  tentedPackage: Partial<TentedPackage["Row"]> | null;
}) {
  const [features, setFeatures] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    price?: string;
    size?: string;
    features?: string;
  }>({});

  const tentTypes = [
    { id: "tent_001", type: "Pole Tent" },
    { id: "tent_002", type: "Frame Tent" },
    { id: "tent_003", type: "Sailcloth Tent" },
    { id: "tent_004", type: "Clear Top Tent" },
    { id: "tent_005", type: "Marquee Tent" },
    { id: "tent_006", type: "Stretch Tent" },
  ];

  function handleChange(key: keyof TentedPackage["Row"], value: any) {
    const updated = { ...(tentedPackage || {}), [key]: value };
    setTentPackageData(updated);
    validateField(key, value);
  }

  function validateField(key: keyof TentedPackage["Row"], value: any) {
    const errors: typeof formErrors = { ...formErrors };

    if (key === "name") {
      errors.name = value ? "" : "Tent type is required.";
    }

    if (key === "price") {
      errors.price =
        typeof value === "number" && value > 0
          ? ""
          : "Valid price is required.";
    }

    if (key === "features") {
      errors.features =
        Array.isArray(value) && value.length > 0
          ? ""
          : "At least one feature is required.";
    }

    if (key === "size") {
      errors.size = value?.trim() ? "" : "Size is required.";
    }

    setFormErrors(errors);
  }

  useEffect(() => {
    setTentPackageData((prev) => {
      return { ...(prev || {}), features };
    });
    validateField("features", features);
  }, [features]);

  return (
    <div className="space-y-6">
      {/* Tent Type */}
      <section className="name">
        <Label className="block mb-1">Tent Type *</Label>
        <Select
          value={tentedPackage?.name ?? ""}
          onValueChange={(val) => handleChange("name", val)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select tent type" />
          </SelectTrigger>
          <SelectContent>
            {tentTypes.map((val) => (
              <SelectItem key={val.id} value={val.type}>
                {val.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )} */}
      </section>

      {/* Price */}
      <section className="price grid gap-2">
        <Label htmlFor="price">Price ($) *</Label>
        <Input
          id="price"
          type="number"
          placeholder="e.g., 100"
          value={tentedPackage?.price?.toString() ?? ""}
          onChange={(e) =>
            handleChange("price", Number(e.target.value) || 0)
          }
        />
        {/* {formErrors.price && (
          <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
        )} */}
      </section>

      {/* Size (in yards) */}
      <section className="grid gap-2">
        <Label htmlFor="size">Size (in yards) *</Label>
        <Input
          id="size"
          type="text"
          placeholder="e.g., 20x30"
          value={tentedPackage?.size ?? ""}
          onChange={(e) => handleChange("size", e.target.value)}
        />
        {/* {formErrors.size && (
          <p className="text-red-500 text-sm mt-1">{formErrors.size}</p>
        )} */}
      </section>

      {/* Features */}
      <section>
        <FreeInputMultiSelect
          selected={features}
          onChange={setFeatures}
          placeholder="Type a feature and press Enter..."
          label="Add features *"
        />
        {/* {formErrors.features && (
          <p className="text-red-500 text-sm mt-1">{formErrors.features}</p>
        )} */}
      </section>

      {/* File Upload */}
      <section>
        <DropZoneCard setFiles={setFiles} />
      </section>
    </div>
  );
}

export default TentPackage;
