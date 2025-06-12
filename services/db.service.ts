import { supabase } from "@/lib/supabase";
import {
  AddVenueParams,
  FloralArrangement,
  SearchVenueByGeoLocationParams,
  TentedPackage,
  Wedding,
} from "@/types/db";

export async function addVenue({
  addresslabel = "Avenue street, 2nd cross, NY USA",
  formattedAddress,
  city = "New york",
  country = "USA",
  zip = "07086",
  state = "NY",
  lat,
  long,
  capacity,
  is_tented,
  price_range = "medium",
  description = null,
  amenities = null,
  created_by,
}: AddVenueParams) {
  /**
   * Taking assumption into consideration
   * addresslabel = name,
   * addresss = formattedAddress
   * city = city
   * country = country
   * zip = zip is which should be optional
   * state = state is which is optional on the radar
   */
  try {
    const { data, error } = await supabase
      .from("venues")
      .insert({
        name: addresslabel,
        city,
        zip,
        country,
        capacity,
        price_range,
        state,
        is_tented,
        amenities,
        description,
        address: formattedAddress,
        latitude: lat,
        longitude: long,
        created_by,
      })
      .select();
    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

//This should give auth user and from auth id should get the user profile and images detail
export async function searchVenueByGeoLocation({
  longitude,
  latitude,
  min_radius_by_miles = 0, // default it is 0
  max_radius_by_miles,
}: SearchVenueByGeoLocationParams) {
  try {
    const { data, error } = await supabase.rpc("get_venues_in_radius", {
      center_lat: latitude,
      center_lon: longitude,
      min_radius: min_radius_by_miles,
      max_radius: max_radius_by_miles,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getVenueByAuthId(authId: string) {
  try {
    const { data, error } = await supabase
      .from("venues")
      .select()
      .eq("created_by", authId);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfileById(authId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", authId);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUpcomingWeddings(
  authId: string,
  weddingsDate: string
) {
  try {
    const bufferDays = 3;

    const { data, error } = await supabase
      .from("weddings")
      .select("date, guest_count, updated_at")
      .eq("couple_id", authId)
      .gte("date", new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()) // at least 2 days in future
      .or(
        `date.gte.${new Date(
          new Date(weddingsDate).getTime() - bufferDays * 24 * 60 * 60 * 1000
        ).toISOString()},date.lte.${new Date(
          new Date(weddingsDate).getTime() + bufferDays * 24 * 60 * 60 * 1000
        ).toISOString()}`
      );

    if (error) throw error;
    return data.length === 0 ? false : data;
  } catch (error) {
    throw error;
  }
}

export async function getWeddingDate(authId: string) {
  try {
    const { data, error } = await supabase
      .from("weddings")
      .select("date, guest_count, updated_at")
      .eq("couple_id", authId);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getVenueByCity(city: string) {
  try {
    const { data, error } = await supabase
      .from("venues")
      .select("latitude, longitude, created_by")
      .ilike("city", `%${city}%`);
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchNearByWedding(
  lat: number,
  long: number,
  weddingDate: string,
  max_distance: number = 5
) {
  try {
    console.log({ long, lat, weddingDate, max_distance });
    const { data, error } = await supabase.rpc(
      "search_weddings_by_location_and_date",
      {
        client_lat: lat,
        client_lon: long,
        target_date: weddingDate,
        max_distance_miles: max_distance,
        buffer_days: 2,
      }
    );
    console.log({ data });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getWedding(authId: string) {
  try {
    const { data, error } = await supabase
      .from("weddings")
      .select("*")
      .eq("couple_id", authId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching wedding:", error);
      return;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateWedding(
  updates: Wedding["Update"],
  weddingId: string
) {
  try {
    if (!weddingId) throw new Error("Invalid wedding ID");

    const { data, error } = await supabase
      .from("weddings")
      .update(updates)
      .eq("id", weddingId)
      .select()
      .maybeSingle();

    console.log({ updateData: data, error, weddingId });

    if (error) throw error;
    if (!data) throw new Error("No wedding found to update.");

    return data;

  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

export async function AddTentedPackage(value: Partial<TentedPackage['Insert']>){
  try {
    const { data, error } = await supabase.from('tent_packages').insert(value).single();
    if(error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function AddListingINMarketPlace(value: FloralArrangement['Insert'] ): Promise<FloralArrangement['Row']>{
  try {
    const { data, error} = await supabase.from('floral_arrangements').insert(value).single();
    if(error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}



