"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    async function loadProfile() {
      try {
        setLoading(true)

        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) {
          throw error
        }

        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("User not authenticated") }

    try {
      const { error } = await supabase.from("profiles").update(updates).eq("id", user.id)

      if (error) {
        throw error
      }

      // Update local state
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))

      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err : new Error("Unknown error") }
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
  }
}
