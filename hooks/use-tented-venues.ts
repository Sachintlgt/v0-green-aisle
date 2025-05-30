"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Venue = Database["public"]["Tables"]["venues"]["Row"]
type TentPackage = Database["public"]["Tables"]["tent_packages"]["Row"]
type TentedVenueBooking = Database["public"]["Tables"]["tented_venue_bookings"]["Row"]

type VenueWithPackages = Venue & {
  tent_packages: TentPackage[]
  bookings: TentedVenueBooking[]
}

export function useTentedVenues() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getTentedVenues = async (location?: string) => {
    try {
      setLoading(true)

      let query = supabase
        .from("venues")
        .select(`
          *,
          tent_packages (*),
          tented_venue_bookings (*)
        `)
        .eq("is_tented", true)

      if (location) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data as VenueWithPackages[]
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return []
    } finally {
      setLoading(false)
    }
  }

  const getVenueById = async (id: string) => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("venues")
        .select(`
          *,
          tent_packages (*),
          tented_venue_bookings (*)
        `)
        .eq("id", id)
        .single()

      if (error) {
        throw error
      }

      return data as VenueWithPackages
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return null
    } finally {
      setLoading(false)
    }
  }

  const bookVenue = async (
    bookingData: Omit<
      Database["public"]["Tables"]["tented_venue_bookings"]["Insert"],
      "id" | "created_at" | "updated_at"
    >,
  ) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.from("tented_venue_bookings").insert(bookingData).select().single()

      if (error) {
        throw error
      }

      return { error: null, booking: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        booking: null,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getTentedVenues,
    getVenueById,
    bookVenue,
  }
}
