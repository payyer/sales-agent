import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categories.api'

/**
 * Custom hook for accessing product categories with built-in caching and
 * loading states provided by TanStack Query.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
