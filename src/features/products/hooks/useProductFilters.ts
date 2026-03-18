import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import type { ProductFilters } from '../types/product-filters.types'

/**
 * A specialized hook to manage product filter state via URL search parameters.
 * This pattern ensures that filters are shareable, persistent on refresh,
 * and integrated with browser history.
 */
export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<ProductFilters>(
    () => ({
      category: searchParams.get('category') || undefined,
      q: searchParams.get('q') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      sort: searchParams.get('sort') || 'newest',
    }),
    [searchParams],
  )

  const setFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)

        Object.entries(newFilters).forEach(([key, value]) => {
          if (value === undefined || value === '' || value === 'all') {
            next.delete(key)
          } else {
            next.set(key, String(value))
          }
        })

        return next
      })
    },
    [setSearchParams],
  )

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  return {
    filters,
    setFilters,
    clearFilters,
  }
}
