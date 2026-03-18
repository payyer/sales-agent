import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById } from '../api/products.api'
import type { ProductFilters } from '../types/product-filters.types'

/**
 * Centralized hook to manage the global products list state.
 * Accepts filters to handle dynamic searching and categorization.
 */
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
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
