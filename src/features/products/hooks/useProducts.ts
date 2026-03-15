import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById } from '../api/products.api'

/**
 * Hook to manage products list state with TanStack Query.
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

/**
 * Hook to manage individual product detail state.
 */
export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
