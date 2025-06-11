import { Database } from "./supabase";

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
  created_by:string
}

export interface SearchVenueByGeoLocationParams {
  longitude: number;
  latitude: number;
  min_radius_by_miles?: number;
  max_radius_by_miles: number;
}

export interface FileObject {
  name: string
  bucket_id: string
  owner: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: Record<string, any>
  buckets: Bucket
}

export type Wedding = Database['public']['Tables']['weddings']