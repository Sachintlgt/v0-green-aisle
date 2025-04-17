"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type Transaction = Database["public"]["Tables"]["transactions"]["Row"]

export function useTransactions() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getTransactions = async () => {
    if (!user) return []

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
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

  const createTransaction = async (
    transactionData: Omit<
      Database["public"]["Tables"]["transactions"]["Insert"],
      "id" | "created_at" | "updated_at" | "buyer_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), transaction: null }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("transactions")
        .insert({ ...transactionData, buyer_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, transaction: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        transaction: null,
      }
    } finally {
      setLoading(false)
    }
  }

  const updateTransactionStatus = async (id: string, status: Transaction["status"]) => {
    if (!user) return { error: new Error("User not authenticated"), transaction: null }

    try {
      setLoading(true)

      // Check if user is involved in this transaction
      const { data: transaction, error: transactionError } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .single()

      if (transactionError) {
        throw transactionError
      }

      const { data, error } = await supabase.from("transactions").update({ status }).eq("id", id).select().single()

      if (error) {
        throw error
      }

      return { error: null, transaction: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        transaction: null,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getTransactions,
    createTransaction,
    updateTransactionStatus,
  }
}
