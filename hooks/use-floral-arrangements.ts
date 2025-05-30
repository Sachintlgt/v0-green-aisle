"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type FloralArrangement = Database["public"]["Tables"]["floral_arrangements"]["Row"]

export function useFloralArrangements() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getFloralArrangements = async (location?: string, tags?: string[]) => {
    try {
      setLoading(true)

      let query = supabase.from("floral_arrangements").select("*").eq("status", "available")

      if (location) {
        query = query.ilike("location", `%${location}%`)
      }

      if (tags && tags.length > 0) {
        // Filter by tags (array contains)
        query = query.contains("tags", tags)
      }

      const { data, error } = await query.order("date_available", { ascending: true })

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

  const getFloralArrangementById = async (id: string) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.from("floral_arrangements").select("*").eq("id", id).single()

      if (error) {
        throw error
      }

      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return null
    } finally {
      setLoading(false)
    }
  }

  const createFloralArrangement = async (
    arrangementData: Omit<
      Database["public"]["Tables"]["floral_arrangements"]["Insert"],
      "id" | "created_at" | "updated_at" | "owner_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), arrangement: null }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("floral_arrangements")
        .insert({ ...arrangementData, owner_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, arrangement: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        arrangement: null,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getFloralArrangements,
    getFloralArrangementById,
    createFloralArrangement,
  }
}
