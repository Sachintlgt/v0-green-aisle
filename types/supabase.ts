export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      floral_arrangements: {
        Row: {
          created_at: string | null
          date_available: string
          description: string | null
          id: string
          images: Json | null
          location: string
          owner_id: string
          owner_type: string
          price: number
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_available: string
          description?: string | null
          id?: string
          images?: Json | null
          location: string
          owner_id: string
          owner_type: string
          price: number
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_available?: string
          description?: string | null
          id?: string
          images?: Json | null
          location?: string
          owner_id?: string
          owner_type?: string
          price?: number
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mood_board_items: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          image_url: string
          is_sharable: boolean | null
          location: string | null
          mood_board_id: string
          source_url: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_sharable?: boolean | null
          location?: string | null
          mood_board_id: string
          source_url?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_sharable?: boolean | null
          location?: string | null
          mood_board_id?: string
          source_url?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mood_board_items_mood_board_id_fkey"
            columns: ["mood_board_id"]
            isOneToOne: false
            referencedRelation: "mood_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_boards: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
          wedding_id: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
          wedding_id?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mood_boards_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          date_available: string
          description: string | null
          id: string
          location: string
          owner_id: string
          owner_type: string
          price: number
          status: string
          tags: string[] | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_available: string
          description?: string | null
          id?: string
          location: string
          owner_id: string
          owner_type: string
          price: number
          status?: string
          tags?: string[] | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_available?: string
          description?: string | null
          id?: string
          location?: string
          owner_id?: string
          owner_type?: string
          price?: number
          status?: string
          tags?: string[] | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          id: string
          location: string | null
          phone: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      shared_resources: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          owner_id: string
          price: number | null
          resource_id: string
          resource_type: string
          shared_with_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          owner_id: string
          price?: number | null
          resource_id: string
          resource_type: string
          shared_with_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          owner_id?: string
          price?: number | null
          resource_id?: string
          resource_type?: string
          shared_with_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tent_packages: {
        Row: {
          capacity: number
          created_at: string | null
          features: Json
          id: string
          name: string
          price: number
          size: string
          updated_at: string | null
          venue_id: string
        }
        Insert: {
          capacity: number
          created_at?: string | null
          features: Json
          id?: string
          name: string
          price: number
          size: string
          updated_at?: string | null
          venue_id: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          features?: Json
          id?: string
          name?: string
          price?: number
          size?: string
          updated_at?: string | null
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tent_packages_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      tented_venue_bookings: {
        Row: {
          couple_id: string
          created_at: string | null
          end_date: string
          id: string
          is_sharing_enabled: boolean | null
          start_date: string
          status: string
          tent_package_id: string | null
          updated_at: string | null
          venue_id: string
        }
        Insert: {
          couple_id: string
          created_at?: string | null
          end_date: string
          id?: string
          is_sharing_enabled?: boolean | null
          start_date: string
          status?: string
          tent_package_id?: string | null
          updated_at?: string | null
          venue_id: string
        }
        Update: {
          couple_id?: string
          created_at?: string | null
          end_date?: string
          id?: string
          is_sharing_enabled?: boolean | null
          start_date?: string
          status?: string
          tent_package_id?: string | null
          updated_at?: string | null
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tented_venue_bookings_tent_package_id_fkey"
            columns: ["tent_package_id"]
            isOneToOne: false
            referencedRelation: "tent_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tented_venue_bookings_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          buyer_id: string
          created_at: string | null
          delivery_method: string
          delivery_notes: string | null
          id: string
          payment_method: string | null
          platform_fee: number
          resource_id: string
          resource_type: string
          seller_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_id: string
          created_at?: string | null
          delivery_method: string
          delivery_notes?: string | null
          id?: string
          payment_method?: string | null
          platform_fee: number
          resource_id: string
          resource_type: string
          seller_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string
          created_at?: string | null
          delivery_method?: string
          delivery_notes?: string | null
          id?: string
          payment_method?: string | null
          platform_fee?: number
          resource_id?: string
          resource_type?: string
          seller_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      vendor_bookings: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          status: string
          time_slot: string
          updated_at: string | null
          vendor_id: string
          wedding_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          status?: string
          time_slot: string
          updated_at?: string | null
          vendor_id: string
          wedding_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          status?: string
          time_slot?: string
          updated_at?: string | null
          vendor_id?: string
          wedding_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_bookings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_bookings_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          business_name: string
          business_type: string
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          plan_type: number | null
          rating: number | null
          review_count: number | null
          service_area: string | null
          state: string | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          stripe_onboarding_complete: boolean | null
          stripe_subscription_id: string | null
          subscription_plan_id: string | null
          subscription_status: string | null
          subscription_tier: string
          updated_at: string | null
          user_id: string
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          plan_type?: number | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          state?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_onboarding_complete?: boolean | null
          stripe_subscription_id?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          updated_at?: string | null
          user_id: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          plan_type?: number | null
          rating?: number | null
          review_count?: number | null
          service_area?: string | null
          state?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_onboarding_complete?: boolean | null
          stripe_subscription_id?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          updated_at?: string | null
          user_id?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      venues: {
        Row: {
          address: string
          amenities: Json | null
          capacity: number | null
          city: string
          country: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_tented: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          price_range: string | null
          state: string
          updated_at: string | null
          zip: string
        }
        Insert: {
          address: string
          amenities?: Json | null
          capacity?: number | null
          city: string
          country: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_tented?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          price_range?: string | null
          state: string
          updated_at?: string | null
          zip: string
        }
        Update: {
          address?: string
          amenities?: Json | null
          capacity?: number | null
          city?: string
          country?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_tented?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          price_range?: string | null
          state?: string
          updated_at?: string | null
          zip?: string
        }
        Relationships: []
      }
      weddings: {
        Row: {
          budget: number | null
          couple_id: string
          created_at: string | null
          date: string | null
          general_location: string | null
          guest_count: number | null
          id: string
          is_exploring_venues: boolean | null
          status: string
          updated_at: string | null
          venue_id: string | null
        }
        Insert: {
          budget?: number | null
          couple_id: string
          created_at?: string | null
          date?: string | null
          general_location?: string | null
          guest_count?: number | null
          id?: string
          is_exploring_venues?: boolean | null
          status?: string
          updated_at?: string | null
          venue_id?: string | null
        }
        Update: {
          budget?: number | null
          couple_id?: string
          created_at?: string | null
          date?: string | null
          general_location?: string | null
          guest_count?: number | null
          id?: string
          is_exploring_venues?: boolean | null
          status?: string
          updated_at?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weddings_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      get_venues_in_radius: {
        Args: {
          center_lat: number
          center_lon: number
          min_radius: number
          max_radius: number
        }
        Returns: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          country: string
          latitude: number
          longitude: number
          capacity: number
          description: string
          amenities: Json
          is_tented: boolean
          price_range: string
          distance: number
          created_by: string
        }[]
      }
      get_weddings_in_radius_by_date: {
        Args: {
          center_lat: number
          center_lon: number
          min_radius: number
          max_radius: number
          window_start: string
          window_end: string
          exclude_couple_id: string
        }
        Returns: {
          wedding_id: string
          couple_id: string
          wedding_date: string
          venue_id: string
          venue_name: string
          latitude: number
          longitude: number
          distance: number
        }[]
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      nearby_venues: {
        Args: { lat: number; lng: number; radius_miles: number }
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
          target_venue_id: string
          target_date: string
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
      search_weddings_by_location_and_date: {
        Args: {
          client_lat: number
          client_lon: number
          target_date: string
          max_distance_miles?: number
          buffer_days?: number
        }
        Returns: {
          wedding_id: string
          wedding_date: string
          couple_id: string
          venue_id: string
          venue_created_at: string
          venue_updated_at: string
          venue_name: string
          venue_address: string
          venue_city: string
          venue_state: string
          venue_zip: string
          venue_country: string
          venue_latitude: number
          venue_longitude: number
          venue_capacity: number
          venue_description: string
          venue_amenities: Json
          venue_is_tented: boolean
          venue_created_by: string
          venue_price_range: string
          distance_miles: number
        }[]
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
