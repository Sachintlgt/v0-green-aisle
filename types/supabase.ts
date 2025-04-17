export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          avatar_url: string | null
          user_type: "couple" | "vendor"
          phone: string | null
          location: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name: string
          avatar_url?: string | null
          user_type: "couple" | "vendor"
          phone?: string | null
          location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string | null
          user_type?: "couple" | "vendor"
          phone?: string | null
          location?: string | null
        }
      }
      weddings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          couple_id: string
          date: string | null
          venue_id: string | null
          guest_count: number | null
          budget: number | null
          status: "planning" | "confirmed" | "completed"
          is_exploring_venues: boolean
          general_location: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          couple_id: string
          date?: string | null
          venue_id?: string | null
          guest_count?: number | null
          budget?: number | null
          status?: "planning" | "confirmed" | "completed"
          is_exploring_venues?: boolean
          general_location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          couple_id?: string
          date?: string | null
          venue_id?: string | null
          guest_count?: number | null
          budget?: number | null
          status?: "planning" | "confirmed" | "completed"
          is_exploring_venues?: boolean
          general_location?: string | null
        }
      }
      venues: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          country: string
          latitude: number | null
          longitude: number | null
          capacity: number | null
          description: string | null
          amenities: Json | null
          is_tented: boolean
          price_range: "low" | "medium" | "high" | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          country: string
          latitude?: number | null
          longitude?: number | null
          capacity?: number | null
          description?: string | null
          amenities?: Json | null
          is_tented?: boolean
          price_range?: "low" | "medium" | "high" | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          country?: string
          latitude?: number | null
          longitude?: number | null
          capacity?: number | null
          description?: string | null
          amenities?: Json | null
          is_tented?: boolean
          price_range?: "low" | "medium" | "high" | null
        }
      }
      tented_venue_bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          venue_id: string
          start_date: string
          end_date: string
          couple_id: string
          status: "pending" | "confirmed" | "cancelled"
          is_sharing_enabled: boolean
          tent_package_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          venue_id: string
          start_date: string
          end_date: string
          couple_id: string
          status?: "pending" | "confirmed" | "cancelled"
          is_sharing_enabled?: boolean
          tent_package_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          venue_id?: string
          start_date?: string
          end_date?: string
          couple_id?: string
          status?: "pending" | "confirmed" | "cancelled"
          is_sharing_enabled?: boolean
          tent_package_id?: string | null
        }
      }
      tent_packages: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          size: string
          capacity: number
          price: number
          features: Json
          venue_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          size: string
          capacity: number
          price: number
          features: Json
          venue_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          size?: string
          capacity?: number
          price?: number
          features?: Json
          venue_id?: string
        }
      }
      vendors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          business_name: string
          business_type: string
          description: string | null
          service_area: string | null
          website: string | null
          phone: string | null
          email: string | null
          rating: number | null
          review_count: number | null
          subscription_tier: "free" | "standard" | "unlimited"
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          business_name: string
          business_type: string
          description?: string | null
          service_area?: string | null
          website?: string | null
          phone?: string | null
          email?: string | null
          rating?: number | null
          review_count?: number | null
          subscription_tier?: "free" | "standard" | "unlimited"
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          business_name?: string
          business_type?: string
          description?: string | null
          service_area?: string | null
          website?: string | null
          phone?: string | null
          email?: string | null
          rating?: number | null
          review_count?: number | null
          subscription_tier?: "free" | "standard" | "unlimited"
        }
      }
      vendor_bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          vendor_id: string
          wedding_id: string | null
          date: string
          time_slot: "morning" | "afternoon" | "evening" | "full_day" | "multi_day"
          status: "available" | "pending" | "confirmed" | "cancelled"
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          vendor_id: string
          wedding_id?: string | null
          date: string
          time_slot: "morning" | "afternoon" | "evening" | "full_day" | "multi_day"
          status?: "available" | "pending" | "confirmed" | "cancelled"
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          vendor_id?: string
          wedding_id?: string | null
          date?: string
          time_slot?: "morning" | "afternoon" | "evening" | "full_day" | "multi_day"
          status?: "available" | "pending" | "confirmed" | "cancelled"
          notes?: string | null
        }
      }
      floral_arrangements: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          price: number
          owner_type: "florist" | "couple" | "shared"
          owner_id: string
          location: string
          date_available: string
          status: "available" | "pending" | "sold"
          images: Json | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          price: number
          owner_type: "florist" | "couple" | "shared"
          owner_id: string
          location: string
          date_available: string
          status?: "available" | "pending" | "sold"
          images?: Json | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          price?: number
          owner_type?: "florist" | "couple" | "shared"
          owner_id?: string
          location?: string
          date_available?: string
          status?: "available" | "pending" | "sold"
          images?: Json | null
          tags?: string[] | null
        }
      }
      mood_boards: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          user_id: string
          is_public: boolean
          wedding_id: string | null
          tags: string[] | null
          cover_image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          user_id: string
          is_public?: boolean
          wedding_id?: string | null
          tags?: string[] | null
          cover_image?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          user_id?: string
          is_public?: boolean
          wedding_id?: string | null
          tags?: string[] | null
          cover_image?: string | null
        }
      }
      mood_board_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          mood_board_id: string
          image_url: string
          title: string | null
          description: string | null
          tags: string[] | null
          source_url: string | null
          is_sharable: boolean
          location: string | null
          date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          mood_board_id: string
          image_url: string
          title?: string | null
          description?: string | null
          tags?: string[] | null
          source_url?: string | null
          is_sharable?: boolean
          location?: string | null
          date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          mood_board_id?: string
          image_url?: string
          title?: string | null
          description?: string | null
          tags?: string[] | null
          source_url?: string | null
          is_sharable?: boolean
          location?: string | null
          date?: string | null
        }
      }
      shared_resources: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          resource_type: "floral" | "decor" | "tent" | "other"
          resource_id: string
          owner_id: string
          shared_with_id: string | null
          status: "offered" | "requested" | "accepted" | "declined" | "completed"
          price: number | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          resource_type: "floral" | "decor" | "tent" | "other"
          resource_id: string
          owner_id: string
          shared_with_id?: string | null
          status?: "offered" | "requested" | "accepted" | "declined" | "completed"
          price?: number | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          resource_type?: "floral" | "decor" | "tent" | "other"
          resource_id?: string
          owner_id?: string
          shared_with_id?: string | null
          status?: "offered" | "requested" | "accepted" | "declined" | "completed"
          price?: number | null
          notes?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          buyer_id: string
          seller_id: string
          resource_type: "floral" | "decor" | "tent" | "other"
          resource_id: string
          amount: number
          platform_fee: number
          status: "pending" | "completed" | "refunded" | "cancelled"
          payment_method: string | null
          delivery_method: "pickup" | "delivery"
          delivery_notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          buyer_id: string
          seller_id: string
          resource_type: "floral" | "decor" | "tent" | "other"
          resource_id: string
          amount: number
          platform_fee: number
          status?: "pending" | "completed" | "refunded" | "cancelled"
          payment_method?: string | null
          delivery_method?: "pickup" | "delivery"
          delivery_notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          buyer_id?: string
          seller_id?: string
          resource_type?: "floral" | "decor" | "tent" | "other"
          resource_id?: string
          amount?: number
          platform_fee?: number
          status?: "pending" | "completed" | "refunded" | "cancelled"
          payment_method?: string | null
          delivery_method?: "pickup" | "delivery"
          delivery_notes?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: "message" | "resource_share" | "transaction" | "system"
          title: string
          message: string
          is_read: boolean
          action_url: string | null
          related_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          type: "message" | "resource_share" | "transaction" | "system"
          title: string
          message: string
          is_read?: boolean
          action_url?: string | null
          related_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: "message" | "resource_share" | "transaction" | "system"
          title?: string
          message?: string
          is_read?: boolean
          action_url?: string | null
          related_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_venues: {
        Args: {
          lat: number
          lng: number
          radius_miles: number
        }
        Returns: {
          id: string
          name: string
          address: string
          city: string
          state: string
          distance_miles: number
        }[]
      }
      nearby_weddings: {
        Args: {
          venue_id: string
          date: string
          days_range: number
        }
        Returns: {
          id: string
          couple_id: string
          date: string
          venue_id: string
          venue_name: string
          distance_days: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
