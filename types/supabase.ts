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
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          poster: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          poster?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          poster?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          category_id: number | null
          content: string | null
          created_at: string
          description: string | null
          id: number
          original_title: string | null
          originalContent: string | null
          originalLink: string | null
          originalPoster: string | null
          slug: string | null
          thumbnail: string | null
          title: string | null
        }
        Insert: {
          category_id?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          original_title?: string | null
          originalContent?: string | null
          originalLink?: string | null
          originalPoster?: string | null
          slug?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Update: {
          category_id?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          original_title?: string | null
          originalContent?: string | null
          originalLink?: string | null
          originalPoster?: string | null
          slug?: string | null
          thumbnail?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_category_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      news_tags: {
        Row: {
          created_at: string
          id: number
          news_id: number
          tag_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          news_id: number
          tag_id: number
        }
        Update: {
          created_at?: string
          id?: number
          news_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "news_tags_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invitation: {
        Args: {
          lookup_invitation_token: string
        }
        Returns: Json
      }
      create_account: {
        Args: {
          slug?: string
          name?: string
        }
        Returns: Json
      }
      create_invitation: {
        Args: {
          account_id: string
          account_role: "owner" | "member"
          invitation_type: "one_time" | "24_hour"
        }
        Returns: Json
      }
      current_user_account_role: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      cyrillic_to_latin: {
        Args: {
          input: string
        }
        Returns: string
      }
      delete_invitation: {
        Args: {
          invitation_id: string
        }
        Returns: undefined
      }
      generate_slug: {
        Args: {
          title: string
          news_id: number
        }
        Returns: string
      }
      get_account: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      get_account_billing_status: {
        Args: {
          account_id: string
        }
        Returns: Json
      }
      get_account_by_slug: {
        Args: {
          slug: string
        }
        Returns: Json
      }
      get_account_id: {
        Args: {
          slug: string
        }
        Returns: string
      }
      get_account_invitations: {
        Args: {
          account_id: string
          results_limit?: number
          results_offset?: number
        }
        Returns: Json
      }
      get_account_members: {
        Args: {
          account_id: string
          results_limit?: number
          results_offset?: number
        }
        Returns: Json
      }
      get_accounts: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_personal_account: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_top_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          id: number
          slug: string
          tag_count: number
        }[]
      }
      lookup_invitation: {
        Args: {
          lookup_invitation_token: string
        }
        Returns: Json
      }
      remove_account_member: {
        Args: {
          account_id: string
          user_id: string
        }
        Returns: undefined
      }
      search_categories_by_name: {
        Args: {
          search_text: string
        }
        Returns: {
          created_at: string
          id: number
          name: string
          poster: string | null
          slug: string | null
        }[]
      }
      search_news_by_original_title: {
        Args: {
          search_text: string
        }
        Returns: {
          category_id: number | null
          content: string | null
          created_at: string
          description: string | null
          id: number
          original_title: string | null
          originalContent: string | null
          originalLink: string | null
          originalPoster: string | null
          slug: string | null
          thumbnail: string | null
          title: string | null
        }[]
      }
      search_tag_by_name: {
        Args: {
          search_text: string
        }
        Returns: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }[]
      }
      service_role_upsert_customer_subscription: {
        Args: {
          account_id: string
          customer?: Json
          subscription?: Json
        }
        Returns: undefined
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      update_account: {
        Args: {
          account_id: string
          slug?: string
          name?: string
          public_metadata?: Json
          replace_metadata?: boolean
        }
        Returns: Json
      }
      update_account_user_role: {
        Args: {
          account_id: string
          user_id: string
          new_account_role: "owner" | "member"
          make_primary_owner?: boolean
        }
        Returns: undefined
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
