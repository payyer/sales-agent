import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCard } from './ProductCard'
import { useProducts } from '../hooks/useProducts'

export const ProductGrid = () => {
  /**
   * We leverage useProducts hook here to cleanly separate server state from UI logic.
   * This ensures the grid automatically re-renders when the cache is invalidated.
   */
  const { data: products, isLoading, isError, error } = useProducts()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-3/4 w-full rounded-xl bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-4 w-1/4 rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    /**
     * Graceful error handling is crucial for a premium feel.
     * We display the specific error message to help the user/developer debug issues.
     */
    return (
      <div className="flex h-40 items-center justify-center rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
        Error: {error instanceof Error ? error.message : 'Failed to load products'}
      </div>
    )
  }

  const productCount = products?.length || 0

  return (
    <div className="flex flex-col gap-8">
      {/* Grid Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          Showing {productCount} products
        </span>
        <div className="flex items-center gap-4">
          <Select defaultValue="newest">
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

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
