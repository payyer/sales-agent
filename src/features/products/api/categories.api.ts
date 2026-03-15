import { supabase } from '@/lib/supabase'
import type { Category } from '../types/category.types'

/**
 * Fetch all product categories from Supabase.
 */
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}
