import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Product } from '@/features/products/types/product.types'
import { Star } from 'lucide-react'

interface ProductDetailInfoProps {
  product: Product
}

export const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Category & Breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
        <Badge
          variant="secondary"
          className="font-medium px-3 py-1 rounded-full uppercase tracking-wider text-[10px]"
        >
          {product.category}
        </Badge>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.8 / 5.0)</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-3xl font-bold text-primary">${product.price}</span>
        {product.price > 40 && (
          <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/40">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div className="prose prose-sm prose-slate dark:prose-invert">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description ||
              'Crafted with precision and premium materials, this piece is designed to offer both style and unmatched comfort.'}
          </p>
        </div>

        <Separator className="my-2" />

        {/* Stock status indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-destructive'}`}
          />
          <span
            className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}
          >
            {product.stock > 0 ? `In Stock (${product.stock} units left)` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}
