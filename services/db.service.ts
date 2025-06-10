import { supabase } from "@/lib/supabase";
import { AddVenueParams, SearchVenueByGeoLocationParams } from "@/types/db";

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
    const { data ,  error } = await supabase.from("venues").insert({
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
    }).select();
    if (error) throw error;
    console.log(data)
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

export async function getWeddingDate(authId: string) {
  try {
    const { data, error } = await supabase
      .from("weddings")
      .select("date, guest_count")
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
      if(error) throw error;
      return data;
  } catch (error) {
    throw error;
  }
}

