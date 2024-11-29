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
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: string
          joined_date: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          joined_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          joined_date?: string
          created_at?: string
        }
      }
      ppf_rolls: {
        Row: {
          id: string
          sku: string
          roll_id: string
          name: string
          length_feet: number
          width_inches: number
          price: number
          category: string
          manufacturer: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          roll_id: string
          name: string
          length_feet: number
          width_inches: number
          price: number
          category: string
          manufacturer: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          roll_id?: string
          name?: string
          length_feet?: number
          width_inches?: number
          price?: number
          category?: string
          manufacturer?: string
          created_at?: string
          updated_at?: string
        }
      }
      installations: {
        Row: {
          id: string
          user_id: string
          date: string
          vehicle_type: string
          film_used: number
          time_spent: number
          customer_satisfaction: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          vehicle_type: string
          film_used: number
          time_spent: number
          customer_satisfaction?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          vehicle_type?: string
          film_used?: number
          time_spent?: number
          customer_satisfaction?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          customer_name: string
          customer_phone: string
          customer_email: string | null
          vehicle_info: string
          date: string
          estimated_duration: number
          installer_id: string
          status: string
          service_type: string
          estimated_square_feet: number
          quoted_price: number
          deposit: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          vehicle_info: string
          date: string
          estimated_duration: number
          installer_id: string
          status?: string
          service_type: string
          estimated_square_feet: number
          quoted_price: number
          deposit?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          vehicle_info?: string
          date?: string
          estimated_duration?: number
          installer_id?: string
          status?: string
          service_type?: string
          estimated_square_feet?: number
          quoted_price?: number
          deposit?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}