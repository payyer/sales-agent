import { supabase } from '@/lib/supabase'
import type { Product } from '../types/product.types'
import type { ProductFilters } from '../types/product-filters.types'

/**
 * Fetches the list of products from the Supabase 'products' table.
 * Supports filtering by category, search query, price range, and sorting.
 */
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  let query = supabase.from('products').select('*')

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters?.q) {
    query = query.ilike('name', `%${filters.q}%`)
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }

  // Handle sorting
  switch (filters?.sort) {
    case 'price-low':
      query = query.order('price', { ascending: true })
      break
    case 'price-high':
      query = query.order('price', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

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
