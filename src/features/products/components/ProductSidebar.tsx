import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCategories } from '../hooks/useCategories'

export const ProductSidebar = () => {
  const { t } = useTranslation()

  /**
   * We fetch categories dynamically from the database to ensure the sidebar
   * filter always stays in sync with our inventory without manual code updates.
   */
  const { data: categories, isLoading } = useCategories()

  return (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">
          {t('dashboard.menu.shop_categories', { defaultValue: 'Categories' })}
        </h3>
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-24 bg-muted rounded" />
              ))}
            </div>
          ) : (
            categories?.map((category) => (
              <div key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                <Checkbox id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))
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
              <Input id="min-price" type="number" placeholder="$0" className="h-9" />
            </div>
            <div className="pt-6 text-muted-foreground font-light">-</div>
            <div className="flex-1 flex flex-col gap-1.5">
              <Label
                htmlFor="max-price"
                className="text-[10px] uppercase text-muted-foreground font-black"
              >
                Max
              </Label>
              <Input id="max-price" type="number" placeholder="$500" className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Sort or other filter could go here */}
    </div>
  )
}
