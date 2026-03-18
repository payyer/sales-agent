import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCard } from './ProductCard'
import { useProducts } from '../hooks/useProducts'
import { useProductFilters } from '../hooks/useProductFilters'
import { Button } from '@/components/ui/button'

export const ProductGrid = () => {
  const { filters, setFilters, clearFilters } = useProductFilters()

  /**
   * We pass filters directly to the useProducts hook.
   * This ensures the grid automatically re-fetches when URL params change.
   */
  const { data: products, isLoading, isError, error } = useProducts(filters)

  const productCount = products?.length || 0
  const isSortActive = filters.sort && filters.sort !== 'newest'
  const hasActiveFilters = !!(
    filters.category ||
    filters.q ||
    filters.minPrice ||
    filters.maxPrice ||
    isSortActive
  )

  return (
    <div className="flex flex-col gap-8">
      {/* Grid Toolbar - Always visible for better UX */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {productCount === 1 ? 'Showing 1 product' : `Showing ${productCount} products`}
        </span>
        <div className="flex items-center gap-4">
          <Select
            value={filters.sort || 'newest'}
            onValueChange={(value) => setFilters({ sort: value })}
          >
            <SelectTrigger className="w-[180px] h-9 border-none bg-transparent font-black uppercase tracking-widest text-xs focus:ring-0 cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort By: Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 animate-pulse">
              <div className="aspect-3/4 w-full rounded-xl bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-4 w-1/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex h-40 items-center justify-center rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
          Error: {error instanceof Error ? error.message : 'Failed to load products'}
        </div>
      )}

      {!isLoading && !isError && productCount === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground mb-4">
            No products found matching your current filters.
          </p>
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline" size="sm">
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {!isLoading && !isError && productCount > 0 && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
