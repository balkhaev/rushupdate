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
      comments: {
        Row: {
          content: string
          created_at: string
          creator_name: string
          id: number
        }
        Insert: {
          content: string
          created_at?: string
          creator_name: string
          id?: number
        }
        Update: {
          content?: string
          created_at?: string
          creator_name?: string
          id?: number
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
          medium: string | null
          poster: string | null
          slug: string | null
          status: Database["public"]["Enums"]["news_status"]
          thumbnail: string | null
          title: string | null
        }
        Insert: {
          category_id?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          medium?: string | null
          poster?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["news_status"]
          thumbnail?: string | null
          title?: string | null
        }
        Update: {
          category_id?: number | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          medium?: string | null
          poster?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["news_status"]
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
      news_comments: {
        Row: {
          comment_id: number
          created_at: string
          id: number
          news_id: number
        }
        Insert: {
          comment_id: number
          created_at?: string
          id?: number
          news_id: number
        }
        Update: {
          comment_id?: number
          created_at?: string
          id?: number
          news_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "news_comments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_comments_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      news_media: {
        Row: {
          created_at: string
          id: number
          news_id: number | null
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          news_id?: number | null
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          news_id?: number | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_media_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
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
      parsed_news: {
        Row: {
          content: string
          created_at: string
          id: number
          poster: string | null
          source: string
          thumbnail: string | null
          title: string
          url: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          poster?: string | null
          source: string
          thumbnail?: string | null
          title: string
          url: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          poster?: string | null
          source?: string
          thumbnail?: string | null
          title?: string
          url?: string
        }
        Relationships: []
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
      create_account: {
        Args: {
          slug?: string
          name?: string
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
      find_related_tags_by_category_slug: {
        Args: {
          category_slug: string
          limit_count?: number
        }
        Returns: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }[]
      }
      find_related_tags_last_24_hours: {
        Args: {
          target_tag: string
        }
        Returns: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }[]
      }
      find_similar_news: {
        Args: {
          current_news_id: number
          limit_count?: number
        }
        Returns: {
          category_id: number | null
          content: string | null
          created_at: string
          description: string | null
          id: number
          medium: string | null
          poster: string | null
          slug: string | null
          status: Database["public"]["Enums"]["news_status"]
          thumbnail: string | null
          title: string | null
        }[]
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
      get_accounts: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_news_layout: {
        Args: {
          limit_news?: number
        }
        Returns: Json
      }
      get_personal_account: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_top_news_by_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
          category_id: number | null
          content: string | null
          created_at: string
          description: string | null
          id: number
          medium: string | null
          poster: string | null
          slug: string | null
          status: Database["public"]["Enums"]["news_status"]
          thumbnail: string | null
          title: string | null
        }[]
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
          medium: string | null
          poster: string | null
          slug: string | null
          status: Database["public"]["Enums"]["news_status"]
          thumbnail: string | null
          title: string | null
        }[]
      }
      search_parsed_news: {
        Args: {
          search_text: string
        }
        Returns: {
          content: string
          created_at: string
          id: number
          poster: string | null
          source: string
          thumbnail: string | null
          title: string
          url: string
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
      upsert_tags: {
        Args: {
          tag_names: string[]
        }
        Returns: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }[]
      }
    }
    Enums: {
      news_status: "published" | "created" | "parsed"
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
