import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categories.api'

/**
 * Hook to fetch and manage product categories.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
