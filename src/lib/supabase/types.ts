export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      strategic_lines: {
        Row: {
          id: string
          code: string
          title: string
          slug: string
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          title: string
          slug: string
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          title?: string
          slug?: string
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      subthemes: {
        Row: {
          id: string
          strategic_line_id: string
          title: string
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          strategic_line_id: string
          title: string
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          strategic_line_id?: string
          title?: string
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      kpis: {
        Row: {
          id: string
          subtheme_id: string
          title: string
          description: string | null
          what_it_measures: string | null
          source: string | null
          measurement_frequency: string | null
          unit: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subtheme_id: string
          title: string
          description?: string | null
          what_it_measures?: string | null
          source?: string | null
          measurement_frequency?: string | null
          unit?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subtheme_id?: string
          title?: string
          description?: string | null
          what_it_measures?: string | null
          source?: string | null
          measurement_frequency?: string | null
          unit?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      kpi_data: {
        Row: {
          id: string
          kpi_id: string
          year: number
          value_region: number | null
          value_national: number | null
          sector: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          kpi_id: string
          year: number
          value_region?: number | null
          value_national?: number | null
          sector?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          kpi_id?: string
          year?: number
          value_region?: number | null
          value_national?: number | null
          sector?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type StrategicLine = Database['public']['Tables']['strategic_lines']['Row']
export type Subtheme = Database['public']['Tables']['subthemes']['Row']
export type KPI = Database['public']['Tables']['kpis']['Row']
export type KPIData = Database['public']['Tables']['kpi_data']['Row']
