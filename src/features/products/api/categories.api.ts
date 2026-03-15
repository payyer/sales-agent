import { supabase } from '@/lib/supabase'
import type { Category } from '../types/category.types'

/**
 * Retrieves all available product categories sorted alphabetically.
 *
 * Fetching categories from the database (instead of hardcoding) allows the store
 * to scale dynamically as we add more product lines in the Supabase dashboard.
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
