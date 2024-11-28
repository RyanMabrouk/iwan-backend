export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string;
          country: string;
          created_at: string;
          id: string;
          name: string;
          postal_code: string;
          state: string;
          street: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          city?: string;
          country?: string;
          created_at?: string;
          id?: string;
          name?: string;
          postal_code?: string;
          state?: string;
          street?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          city?: string;
          country?: string;
          created_at?: string;
          id?: string;
          name?: string;
          postal_code?: string;
          state?: string;
          street?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      banners: {
        Row: {
          book_id: string;
          created_at: string;
          id: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          book_id: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          book_id?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'banners_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
        ];
      };
      book_categories: {
        Row: {
          book_id: string;
          category_id: string;
        };
        Insert: {
          book_id: string;
          category_id: string;
        };
        Update: {
          book_id?: string;
          category_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_categories_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_categories_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      book_subcategories: {
        Row: {
          book_id: string;
          subcategory_id: string;
        };
        Insert: {
          book_id: string;
          subcategory_id: string;
        };
        Update: {
          book_id?: string;
          subcategory_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_subcategories_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_subcategories_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'subcategories';
            referencedColumns: ['id'];
          },
        ];
      };
      books: {
        Row: {
          canonical: string;
          corner_id: string | null;
          cover_type_id: string | null;
          created_at: string;
          description: string;
          discount: number;
          discount_type: Database['public']['Enums']['discount_type_enum'];
          editor: string;
          id: string;
          images_urls: string[];
          isbn: string;
          meta_description: string;
          meta_image: string;
          meta_keywords: string[];
          meta_title: string;
          number_of_volumes: number;
          page_count: number;
          price: number;
          price_after_discount: number;
          price_dollar: number;
          release_year: number | null;
          share_house_id: string | null;
          slug: string;
          status: Database['public']['Enums']['status_enum'] | null;
          stock: number;
          structured_data: string;
          title: string;
          updated_at: string;
          weight: number;
          writer_id: string | null;
        };
        Insert: {
          canonical?: string;
          corner_id?: string | null;
          cover_type_id?: string | null;
          created_at?: string;
          description?: string;
          discount?: number;
          discount_type?: Database['public']['Enums']['discount_type_enum'];
          editor?: string;
          id?: string;
          images_urls?: string[];
          isbn?: string;
          meta_description?: string;
          meta_image?: string;
          meta_keywords?: string[];
          meta_title?: string;
          number_of_volumes?: number;
          page_count?: number;
          price?: number;
          price_after_discount?: number;
          price_dollar?: number;
          release_year?: number | null;
          share_house_id?: string | null;
          slug?: string;
          status?: Database['public']['Enums']['status_enum'] | null;
          stock?: number;
          structured_data?: string;
          title?: string;
          updated_at?: string;
          weight?: number;
          writer_id?: string | null;
        };
        Update: {
          canonical?: string;
          corner_id?: string | null;
          cover_type_id?: string | null;
          created_at?: string;
          description?: string;
          discount?: number;
          discount_type?: Database['public']['Enums']['discount_type_enum'];
          editor?: string;
          id?: string;
          images_urls?: string[];
          isbn?: string;
          meta_description?: string;
          meta_image?: string;
          meta_keywords?: string[];
          meta_title?: string;
          number_of_volumes?: number;
          page_count?: number;
          price?: number;
          price_after_discount?: number;
          price_dollar?: number;
          release_year?: number | null;
          share_house_id?: string | null;
          slug?: string;
          status?: Database['public']['Enums']['status_enum'] | null;
          stock?: number;
          structured_data?: string;
          title?: string;
          updated_at?: string;
          weight?: number;
          writer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'books_corner_id_fkey';
            columns: ['corner_id'];
            isOneToOne: false;
            referencedRelation: 'corners';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'books_cover_type_id_fkey';
            columns: ['cover_type_id'];
            isOneToOne: false;
            referencedRelation: 'cover_types';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'books_share_house_id_fkey';
            columns: ['share_house_id'];
            isOneToOne: false;
            referencedRelation: 'share_houses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'books_writer_id_fkey';
            columns: ['writer_id'];
            isOneToOne: false;
            referencedRelation: 'writers';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      corners: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cover_types: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      event_books: {
        Row: {
          book_id: string | null;
          event_id: string | null;
        };
        Insert: {
          book_id?: string | null;
          event_id?: string | null;
        };
        Update: {
          book_id?: string | null;
          event_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'event_books_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_books_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      kysely_migration: {
        Row: {
          name: string;
          timestamp: string;
        };
        Insert: {
          name: string;
          timestamp: string;
        };
        Update: {
          name?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
      kysely_migration_lock: {
        Row: {
          id: string;
          is_locked: number;
        };
        Insert: {
          id: string;
          is_locked?: number;
        };
        Update: {
          id?: string;
          is_locked?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          address: string;
          cancel_reason: string | null;
          city: string;
          created_at: string;
          delivery_price: number;
          email: string;
          id: string;
          name: string;
          payment_method: Database['public']['Enums']['payment_method_enum'];
          phone_number: string;
          postal_code: string;
          status: Database['public']['Enums']['payment_status_enum'];
          total_price: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address: string;
          cancel_reason?: string | null;
          city: string;
          created_at?: string;
          delivery_price: number;
          email: string;
          id?: string;
          name: string;
          payment_method: Database['public']['Enums']['payment_method_enum'];
          phone_number: string;
          postal_code: string;
          status: Database['public']['Enums']['payment_status_enum'];
          total_price: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string;
          cancel_reason?: string | null;
          city?: string;
          created_at?: string;
          delivery_price?: number;
          email?: string;
          id?: string;
          name?: string;
          payment_method?: Database['public']['Enums']['payment_method_enum'];
          phone_number?: string;
          postal_code?: string;
          status?: Database['public']['Enums']['payment_status_enum'];
          total_price?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      orders_products: {
        Row: {
          book_id: string;
          created_at: string;
          discount: number;
          discount_type: Database['public']['Enums']['discount_type_enum'];
          id: string;
          order_id: string;
          price_before_discount: number;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          book_id: string;
          created_at?: string;
          discount: number;
          discount_type: Database['public']['Enums']['discount_type_enum'];
          id?: string;
          order_id: string;
          price_before_discount: number;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          book_id?: string;
          created_at?: string;
          discount?: number;
          discount_type?: Database['public']['Enums']['discount_type_enum'];
          id?: string;
          order_id?: string;
          price_before_discount?: number;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_products_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_products_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      share_houses: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subcategories: {
        Row: {
          category_id: string;
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          category_id: string;
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subcategories_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar: string;
          created_at: string;
          email: string;
          first_name: string;
          last_name: string;
          roles: Database['public']['Enums']['roles_enum'][];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar?: string;
          created_at?: string;
          email: string;
          first_name?: string;
          last_name?: string;
          roles?: Database['public']['Enums']['roles_enum'][];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar?: string;
          created_at?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          roles?: Database['public']['Enums']['roles_enum'][];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      wishlists: {
        Row: {
          book_id: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          book_id: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          book_id?: string;
          created_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'wishlists_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlists_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      writers: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      discount_type_enum: 'percentage' | 'fixed';
      payment_method_enum: 'onDelivery' | 'online' | 'bank';
      payment_status_enum: 'pending' | 'paid' | 'canceled';
      roles_enum: 'user' | 'admin';
      status_enum: 'available' | 'unavailable';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
