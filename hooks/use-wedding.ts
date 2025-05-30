"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type Wedding = Database["public"]["Tables"]["weddings"]["Row"]

export function useWedding() {
  const { user } = useAuth()
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setWedding(null)
      setLoading(false)
      return
    }

    async function loadWedding() {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from("weddings")
          .select("*")
          .eq("couple_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (error) {
          if (error.code === "PGRST116") {
            // No wedding found, not an error
            setWedding(null)
            return
          }
          throw error
        }

        setWedding(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    loadWedding()
  }, [user])

  const createWedding = async (
    weddingData: Omit<Database["public"]["Tables"]["weddings"]["Insert"], "id" | "created_at" | "updated_at">,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), wedding: null }

    try {
      const { data, error } = await supabase
        .from("weddings")
        .insert({ ...weddingData, couple_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      setWedding(data)
      return { error: null, wedding: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        wedding: null,
      }
    }
  }

  const updateWedding = async (
    updates: Partial<Omit<Database["public"]["Tables"]["weddings"]["Update"], "id" | "couple_id">>,
  ) => {
    if (!user || !wedding) return { error: new Error("Wedding not found"), wedding: null }

    try {
      const { data, error } = await supabase.from("weddings").update(updates).eq("id", wedding.id).select().single()

      if (error) {
        throw error
      }

      setWedding(data)
      return { error: null, wedding: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        wedding: null,
      }
    }
  }

  return {
    wedding,
    loading,
    error,
    createWedding,
    updateWedding,
  }
}
