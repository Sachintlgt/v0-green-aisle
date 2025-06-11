import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Address = {
  addressLabel?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  country?: string;
  formattedlocation?: string;
  layer?: string;
};

type Props = {
  location: Address;
  setLocation: React.Dispatch<React.SetStateAction<Address>>;
};

function AddressAutoFieldEdit({ location, setLocation }: Props) {


  const handleChange = (
    field: keyof Address,
    value: string
  ) => {
    setLocation((prev) => ({
      ...prev,
        [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 mt-4">
      { (
        <div>
          <Label htmlFor="addressLabel">Street / Label</Label>
          <Input
            id="addressLabel"
            value={location?.addressLabel ?? ""}
            onChange={(e) => handleChange("addressLabel", e.target.value)}
          />
        </div>
      )}
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={location?.city ?? ""}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={location?.state ?? ""}
          onChange={(e) => handleChange("state", e.target.value)}
        />
      </div>
    </div>
  );
}

export default AddressAutoFieldEdit;
