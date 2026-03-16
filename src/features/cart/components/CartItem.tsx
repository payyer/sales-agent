import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem as CartItemType } from '../types/cart.types'
import { useCartStore } from '@/stores/cart.store'

interface CartItemProps {
  item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0 group animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Product Image */}
      <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-muted shrink-0 border border-border/50">
        <img
          src={item.images[0] || '/placeholder.png'}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between self-stretch pr-[10px]">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 -mr-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
              onClick={() => removeItem(item.id, item.selectedVariant)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>

          {item.selectedVariant && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Variant: <span className="text-foreground">{item.selectedVariant}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-md border border-border h-8 bg-background overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-8 rounded-none border-r border-border hover:bg-muted"
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-xs font-bold tabular-nums">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-8 rounded-none border-l border-border hover:bg-muted"
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Pricing */}
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
