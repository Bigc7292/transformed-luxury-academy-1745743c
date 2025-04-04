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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string
          id?: string
          role: string
          user_id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          bot_response: string
          created_at: string
          id: string
          session_id: string
          user_message: string
        }
        Insert: {
          bot_response: string
          created_at?: string
          id?: string
          session_id: string
          user_message: string
        }
        Update: {
          bot_response?: string
          created_at?: string
          id?: string
          session_id?: string
          user_message?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          active: boolean | null
          category: Database["public"]["Enums"]["content_category"]
          created_at: string
          description: string | null
          display_order: number | null
          downloads: number | null
          id: string
          is_featured: boolean | null
          likes: number | null
          media_type: Database["public"]["Enums"]["media_type"]
          meta_description: string | null
          meta_keywords: string | null
          meta_robots: string | null
          meta_title: string | null
          metadata: Json | null
          page_location: string | null
          page_section: Database["public"]["Enums"]["page_section"] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string
          view_count: number | null
        }
        Insert: {
          active?: boolean | null
          category: Database["public"]["Enums"]["content_category"]
          created_at?: string
          description?: string | null
          display_order?: number | null
          downloads?: number | null
          id?: string
          is_featured?: boolean | null
          likes?: number | null
          media_type: Database["public"]["Enums"]["media_type"]
          meta_description?: string | null
          meta_keywords?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          metadata?: Json | null
          page_location?: string | null
          page_section?: Database["public"]["Enums"]["page_section"] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url: string
          view_count?: number | null
        }
        Update: {
          active?: boolean | null
          category?: Database["public"]["Enums"]["content_category"]
          created_at?: string
          description?: string | null
          display_order?: number | null
          downloads?: number | null
          id?: string
          is_featured?: boolean | null
          likes?: number | null
          media_type?: Database["public"]["Enums"]["media_type"]
          meta_description?: string | null
          meta_keywords?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          metadata?: Json | null
          page_location?: string | null
          page_section?: Database["public"]["Enums"]["page_section"] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string
          view_count?: number | null
        }
        Relationships: []
      }
      custom_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      customer_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          session_id: string | null
          status: string
          topic: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          session_id?: string | null
          status?: string
          topic: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          session_id?: string | null
          status?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      content_category: "promotional" | "staff" | "awards" | "ceo" | "founder"
      media_type: "image" | "video"
      page_section:
        | "home_hero"
        | "home_featured"
        | "home_carousel"
        | "about_gallery"
        | "services_showcase"
        | "gallery_main"
        | "gallery_featured"
        | "content_page_featured"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
