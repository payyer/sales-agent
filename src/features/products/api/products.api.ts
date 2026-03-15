import { supabase } from '@/lib/supabase'
import type { Product } from '../types/product.types'

/**
 * Fetches the list of products from the Supabase 'products' table.
 *
 * We use an explicit order by 'created_at' to ensure a consistent experience
 * where the newest items appear first in the product grid.
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
 * Retrieves a single product's details using its unique identifier.
 *
 * This is essential for rendering the Product Detail page and for the Sales Agent
 * to provide specific information about a particular item.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
