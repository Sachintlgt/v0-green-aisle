"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Database } from "@/types/supabase"

type MoodBoard = Database["public"]["Tables"]["mood_boards"]["Row"]
type MoodBoardItem = Database["public"]["Tables"]["mood_board_items"]["Row"]

type MoodBoardWithItems = MoodBoard & {
  items: MoodBoardItem[]
}

export function useMoodBoards() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getMoodBoards = async (includePublic = false) => {
    if (!user && !includePublic) return []

    try {
      setLoading(true)

      let query = supabase.from("mood_boards").select(`
          *,
          items:mood_board_items(*)
        `)

      if (user && includePublic) {
        // Get user's boards and public boards
        query = query.or(`user_id.eq.${user.id},is_public.eq.true`)
      } else if (user) {
        // Get only user's boards
        query = query.eq("user_id", user.id)
      } else {
        // Get only public boards
        query = query.eq("is_public", true)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      return data as MoodBoardWithItems[]
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return []
    } finally {
      setLoading(false)
    }
  }

  const getMoodBoardById = async (id: string) => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("mood_boards")
        .select(`
          *,
          items:mood_board_items(*)
        `)
        .eq("id", id)
        .single()

      if (error) {
        throw error
      }

      // Check if user has access to this board
      if (!data.is_public && data.user_id !== user?.id) {
        throw new Error("You do not have access to this mood board")
      }

      return data as MoodBoardWithItems
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      return null
    } finally {
      setLoading(false)
    }
  }

  const createMoodBoard = async (
    boardData: Omit<
      Database["public"]["Tables"]["mood_boards"]["Insert"],
      "id" | "created_at" | "updated_at" | "user_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), board: null }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("mood_boards")
        .insert({ ...boardData, user_id: user.id })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, board: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        board: null,
      }
    } finally {
      setLoading(false)
    }
  }

  const addItemToMoodBoard = async (
    boardId: string,
    itemData: Omit<
      Database["public"]["Tables"]["mood_board_items"]["Insert"],
      "id" | "created_at" | "updated_at" | "mood_board_id"
    >,
  ) => {
    if (!user) return { error: new Error("User not authenticated"), item: null }

    try {
      setLoading(true)

      // First check if user owns the board
      const { data: board, error: boardError } = await supabase
        .from("mood_boards")
        .select("user_id")
        .eq("id", boardId)
        .single()

      if (boardError) {
        throw boardError
      }

      if (board.user_id !== user.id) {
        throw new Error("You do not have permission to add items to this board")
      }

      const { data, error } = await supabase
        .from("mood_board_items")
        .insert({ ...itemData, mood_board_id: boardId })
        .select()
        .single()

      if (error) {
        throw error
      }

      return { error: null, item: data }
    } catch (err) {
      return {
        error: err instanceof Error ? err : new Error("Unknown error"),
        item: null,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getMoodBoards,
    getMoodBoardById,
    createMoodBoard,
    addItemToMoodBoard,
  }
}
