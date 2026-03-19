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

export const useProductDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => (id ? getProductById(id) : Promise.resolve(null)),
    enabled: !!id,
  })
}
