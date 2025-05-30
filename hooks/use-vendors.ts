"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type Vendor = Database["public"]["Tables"]["vendors"]["Row"]
type VendorBooking = Database["public"]["Tables"]["vendor_bookings"]["Row"]

type VendorWithBookings = Vendor & {
  bookings: VendorBooking[]
}

export function useVendors() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getNearbyVendors = async (location: string, radius = 5) => {
    try {
      setLoading(true)

      // In a real implementation, we would use the nearby_venues function
      // For simplicity, we'll just filter by location string
      const { data, error } = await supabase
        .from("vendors")
        .select(`
          *,
          bookings:vendor_bookings(*)
        `)
        .ilike("service_area", `%${location}%`)

      if (error) {
        throw error
      }

      return data as VendorWithBookings[]
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return []
    } finally {
      setLoading(false)
    }
  }

  const getVendorById = async (id: string) => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("vendors")
        .select(`
          *,
          bookings:vendor_bookings(*)
        `)
        .eq("id", id)
        .single()

      if (error) {
        throw error
      }

      return data as VendorWithBookings
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return null
    } finally {
      setLoading(false)
    }
  }

  const createVendorProfile = async (
    vendorData: Omit<Database["public"]["Tables"]["vendors"]["Insert"], "id" | "created_at" | "updated_at" | "user_id">,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), vendor: null }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("vendors")
        .insert({ ...vendorData, user_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, vendor: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        vendor: null,
      }
    } finally {
      setLoading(false)
    }
  }

  const addVendorBooking = async (
    vendorId: string,
    bookingData: Omit<
      Database["public"]["Tables"]["vendor_bookings"]["Insert"],
      "id" | "created_at" | "updated_at" | "vendor_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), booking: null }

    try {
      setLoading(true)

      // Check if user is the vendor
      const { data: vendor, error: vendorError } = await supabase
        .from("vendors")
        .select("user_id")
        .eq("id", vendorId)
        .single()

      if (vendorError) {
        throw vendorError
      }

      if (vendor.user_id !== user.id) {
        throw new Error("You do not have permission to add bookings for this vendor")
      }

      const { data, error } = await supabase
        .from("vendor_bookings")
        .insert({ ...bookingData, vendor_id: vendorId })
        .select()
        .single()

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
    getNearbyVendors,
    getVendorById,
    createVendorProfile,
    addVendorBooking,
  }
}
