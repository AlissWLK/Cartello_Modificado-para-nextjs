import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey )


// Tipos para o banco de dados
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  old_price?: number
  image_url: string
  category: string
  brand: string
  code: string
  stock: number
  specifications?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

