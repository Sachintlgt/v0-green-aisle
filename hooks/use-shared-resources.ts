"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type SharedResource = Database["public"]["Tables"]["shared_resources"]["Row"]

export function useSharedResources() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getSharedResources = async () => {
    if (!user) return []

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("shared_resources")
        .select("*")
        .or(`owner_id.eq.${user.id},shared_with_id.eq.${user.id}`)
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return []
    } finally {
      setLoading(false)
    }
  }

  const shareResource = async (
    resourceData: Omit<
      Database["public"]["Tables"]["shared_resources"]["Insert"],
      "id" | "created_at" | "updated_at" | "owner_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), resource: null }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("shared_resources")
        .insert({ ...resourceData, owner_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, resource: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        resource: null,
      }
    } finally {
      setLoading(false)
    }
  }

  const updateSharedResourceStatus = async (id: string, status: SharedResource["status"]) => {
    if (!user) return { error: new Error("User not authenticated"), resource: null }

    try {
      setLoading(true)

      // Check if user is involved in this shared resource
      const { data: resource, error: resourceError } = await supabase
        .from("shared_resources")
        .select("*")
        .eq("id", id)
        .or(`owner_id.eq.${user.id},shared_with_id.eq.${user.id}`)
        .single()

      if (resourceError) {
        throw resourceError
      }

      const { data, error } = await supabase.from("shared_resources").update({ status }).eq("id", id).select().single()

      if (error) {
        throw error
      }

      return { error: null, resource: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        resource: null,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getSharedResources,
    shareResource,
    updateSharedResourceStatus,
  }
}
