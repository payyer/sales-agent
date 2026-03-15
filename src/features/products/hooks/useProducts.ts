import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById } from '../api/products.api'

/**
 * Centralized hook to manage the global products list state.
 *
 * Using TanStack Query allows for efficient caching and avoids redundant
 * API calls as the user navigates between the home and agent pages.
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

/**
 * Custom hook for fetching individual product details.
 *
 * 'id' is used as part of the query key to ensure specific item details are
 * cached independently, preventing state collisions in the UI.
 */
export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
