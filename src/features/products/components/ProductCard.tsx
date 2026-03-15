import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '../types/product.types'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-muted/30">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.images?.[0] || ''}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Quick Add Button (Visible on Hover) */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className="w-full bg-white text-foreground hover:bg-foreground hover:text-background cursor-pointer shadow-lg border-none font-bold uppercase text-xs tracking-widest h-11 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to cart logic
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              {product.category || 'Uncategorized'}
            </span>
            <Link to={`/product/${product.id}`} className="hover:underline">
              <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
            </Link>
          </div>
          <span className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
