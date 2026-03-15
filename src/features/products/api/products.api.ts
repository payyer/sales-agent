import { supabase } from '@/lib/supabase'
import type { Product } from '../types/product.types'

/**
 * Fetch products from Supabase database.
 * We can easily add filters and search logic here later.
 */
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Fetch a single product by ID.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
