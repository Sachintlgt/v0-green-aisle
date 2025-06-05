import { supabase } from "@/lib/supabase"
import { AddVenueParams } from "@/types/db"

export async function addVenue({
  addresslabel="Avenue street, 2nd cross, NY USA",
  formattedAddress,
  city='New york',
  country='USA',
  zip = '07086',
  state='NY',
  lat,
  long,
  capacity,
  is_tented,
  price_range='medium',
  description=null,
  amenities=null,
}:AddVenueParams){
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
   const { error } =  await supabase.from('venues').insert({
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
    });
    if(error) throw error
  } catch (error) {
    throw error
  }
}