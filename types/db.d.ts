type PriceRange = "low" | "medium" | "high";

export interface AddVenueParams {
  addresslabel?: string; // Optional, default provided in function
  formattedAddress: string;
  city?: string; // Optional, default: 'New york'
  state?: string; // Optional, default: 'NY'
  zip?: string; // Optional, default: '07086'
  country?: string; // Optional, default: 'USA'
  lat?: number | null;
  long?: number | null;
  capacity?: number | null;
  description?: string | null;
  amenities?: Record<string, any> | null;
  is_tented?: boolean;
  price_range?: PriceRange;
}
