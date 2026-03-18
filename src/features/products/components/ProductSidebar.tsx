import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useCategories } from '../hooks/useCategories'
import { useProductFilters } from '../hooks/useProductFilters'
import { Search, X } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

export const ProductSidebar = () => {
  const { t } = useTranslation()
  const [isPending, startTransition] = useTransition()
  const { data: categories, isLoading } = useCategories()
  const { filters, setFilters, clearFilters } = useProductFilters()

  // Local state for immediate input feedback
  const [localSearch, setLocalSearch] = useState(filters.q || '')
  const [prevFilterQ, setPrevFilterQ] = useState(filters.q)

  // Sync local search when URL state changes externally (e.g. Reset)
  // This is a 'senior' pattern: syncing state during render avoids extra render passes.
  if (filters.q !== prevFilterQ) {
    setPrevFilterQ(filters.q)
    setLocalSearch(filters.q || '')
  }

  // Debounce the local search value
  const debouncedSearch = useDebounce(localSearch, 500)

  /**
   * Update URL filters when debounced search term changes.
   * We use startTransition to ensure the input remains perfectly responsive
   * even if the URL update triggers a heavy re-fetch/re-render.
   */
  useEffect(() => {
    if (debouncedSearch !== (filters.q || '')) {
      startTransition(() => {
        setFilters({ q: debouncedSearch || undefined })
      })
    }
  }, [debouncedSearch, filters.q, setFilters])

  return (
    <div className={`flex flex-col gap-8 ${isPending ? 'opacity-70 cursor-wait' : ''}`}>
      {/* Search */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">
          {t('products.filter.search', { defaultValue: 'Search name' })}
        </h3>
        <div className="relative">
          <Input
            placeholder="Type name..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground">
            {t('dashboard.menu.shop_categories', { defaultValue: 'Categories' })}
          </h3>
          {filters.category && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setFilters({ category: undefined })}
            >
              <X className="mr-1 size-3" /> Clear
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-24 bg-muted rounded" />
              ))}
            </div>
          ) : (
            <>
              {/* "All" Option */}
              <div
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setFilters({ category: undefined })}
              >
                <Checkbox id="category-all" checked={!filters.category} />
                <Label
                  htmlFor="category-all"
                  className={`text-sm font-medium transition-colors cursor-pointer ${!filters.category ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                >
                  All Categories
                </Label>
              </div>

              {categories?.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                  onClick={() => setFilters({ category: category.slug })}
                >
                  <Checkbox id={category.id} checked={filters.category === category.slug} />
                  <Label
                    htmlFor={category.id}
                    className={`text-sm font-medium transition-colors cursor-pointer ${filters.category === category.slug ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">
          Price Range
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <Label
                htmlFor="min-price"
                className="text-[10px] uppercase text-muted-foreground font-black"
              >
                Min
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="$0"
                className="h-9"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  setFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
            <div className="pt-6 text-muted-foreground font-light">-</div>
            <div className="flex-1 flex flex-col gap-1.5">
              <Label
                htmlFor="max-price"
                className="text-[10px] uppercase text-muted-foreground font-black"
              >
                Max
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="$500"
                className="h-9"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs uppercase tracking-widest font-black"
        onClick={clearFilters}
      >
        Reset Filters
      </Button>
    </div>
  )
}
