import { ProductSidebar } from '@/features/products/components/ProductSidebar'
import { ProductGrid } from '@/features/products/components/ProductGrid'

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <aside className="w-full lg:w-64 shrink-0">
          <ProductSidebar />
        </aside>

        <section className="flex-1">
          <ProductGrid />
        </section>
      </div>
    </div>
  )
}
