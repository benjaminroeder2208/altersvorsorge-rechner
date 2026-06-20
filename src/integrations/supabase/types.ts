export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_assistant_leads: {
        Row: {
          alter: number | null
          created_at: string
          email: string | null
          ergebnis_kapital: number | null
          flow_completed: boolean | null
          id: string
          kinder_anzahl: number | null
          newsletter_opt_in: boolean | null
          rendite_prozent: number | null
          renteneintrittsalter: number | null
          session_id: string | null
          sparbetrag_monatlich: number | null
          vorname: string | null
        }
        Insert: {
          alter?: number | null
          created_at?: string
          email?: string | null
          ergebnis_kapital?: number | null
          flow_completed?: boolean | null
          id?: string
          kinder_anzahl?: number | null
          newsletter_opt_in?: boolean | null
          rendite_prozent?: number | null
          renteneintrittsalter?: number | null
          session_id?: string | null
          sparbetrag_monatlich?: number | null
          vorname?: string | null
        }
        Update: {
          alter?: number | null
          created_at?: string
          email?: string | null
          ergebnis_kapital?: number | null
          flow_completed?: boolean | null
          id?: string
          kinder_anzahl?: number | null
          newsletter_opt_in?: boolean | null
          rendite_prozent?: number | null
          renteneintrittsalter?: number | null
          session_id?: string | null
          sparbetrag_monatlich?: number | null
          vorname?: string | null
        }
        Relationships: []
      }
      calculator_results: {
        Row: {
          birth_year: number
          capital_gains: number
          children: number
          created_at: string
          id: string
          income_bracket: string
          monthly_contribution: number
          monthly_payout: number
          own_contributions: number
          retirement_age: number
          return_assumption: number
          subsidies: number
          tax_benefits: number
          total_capital: number
          user_id: string | null
        }
        Insert: {
          birth_year: number
          capital_gains: number
          children?: number
          created_at?: string
          id?: string
          income_bracket: string
          monthly_contribution: number
          monthly_payout: number
          own_contributions: number
          retirement_age?: number
          return_assumption?: number
          subsidies: number
          tax_benefits: number
          total_capital: number
          user_id?: string | null
        }
        Update: {
          birth_year?: number
          capital_gains?: number
          children?: number
          created_at?: string
          id?: string
          income_bracket?: string
          monthly_contribution?: number
          monthly_payout?: number
          own_contributions?: number
          retirement_age?: number
          return_assumption?: number
          subsidies?: number
          tax_benefits?: number
          total_capital?: number
          user_id?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      newsletter_edition_recipients: {
        Row: {
          created_at: string
          edition_id: string
          email: string
          error_message: string | null
          id: string
          resend_message_id: string | null
          sent_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          edition_id: string
          email: string
          error_message?: string | null
          id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          edition_id?: string
          email?: string
          error_message?: string | null
          id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_edition_recipients_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "newsletter_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_editions: {
        Row: {
          created_at: string
          created_by: string | null
          failed_count: number
          html_content: string
          id: string
          preheader: string | null
          recipient_count: number
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          success_count: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          failed_count?: number
          html_content: string
          id?: string
          preheader?: string | null
          recipient_count?: number
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          success_count?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          failed_count?: number
          html_content?: string
          id?: string
          preheader?: string | null
          recipient_count?: number
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          success_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          lead_magnet_type: string
          pdf_base64: string | null
          source: string
          status: string
          subscribed_to_newsletter: boolean
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          lead_magnet_type?: string
          pdf_base64?: string | null
          source?: string
          status?: string
          subscribed_to_newsletter?: boolean
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_magnet_type?: string
          pdf_base64?: string | null
          source?: string
          status?: string
          subscribed_to_newsletter?: boolean
        }
        Relationships: []
      }
      scheduled_followup_emails: {
        Row: {
          cancelled: boolean
          created_at: string
          email: string
          id: string
          mail_type: string
          resend_message_id: string
          scheduled_at: string
        }
        Insert: {
          cancelled?: boolean
          created_at?: string
          email: string
          id?: string
          mail_type: string
          resend_message_id: string
          scheduled_at: string
        }
        Update: {
          cancelled?: boolean
          created_at?: string
          email?: string
          id?: string
          mail_type?: string
          resend_message_id?: string
          scheduled_at?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string
          details: Json | null
          email: string | null
          event_type: string
          id: string
          ip_address: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          email?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          email?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      simulation_leads: {
        Row: {
          birth_year: number
          calculated_capital: number
          children: number
          confirmation_token: string | null
          confirmed: boolean
          created_at: string
          email: string
          embed_source: string | null
          id: string
          monthly_contribution: number
          monthly_payout: number
          pdf_base64: string | null
          retirement_age: number
          return_assumption: number
          total_subsidies: number
        }
        Insert: {
          birth_year: number
          calculated_capital: number
          children?: number
          confirmation_token?: string | null
          confirmed?: boolean
          created_at?: string
          email: string
          embed_source?: string | null
          id?: string
          monthly_contribution: number
          monthly_payout: number
          pdf_base64?: string | null
          retirement_age?: number
          return_assumption?: number
          total_subsidies?: number
        }
        Update: {
          birth_year?: number
          calculated_capital?: number
          children?: number
          confirmation_token?: string | null
          confirmed?: boolean
          created_at?: string
          email?: string
          embed_source?: string | null
          id?: string
          monthly_contribution?: number
          monthly_payout?: number
          pdf_base64?: string | null
          retirement_age?: number
          return_assumption?: number
          total_subsidies?: number
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
