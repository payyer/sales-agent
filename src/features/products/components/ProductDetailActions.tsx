import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Plus, Minus, ShoppingCart, CreditCard, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart.store'
import type { ProductWithUI } from '@/features/products/types/product.types'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface ProductDetailActionsProps {
  product: ProductWithUI
}

export const ProductDetailActions = ({ product }: ProductDetailActionsProps) => {
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard')

  const handleAddToCart = () => {
    const variant = `${selectedSize} / ${selectedColor}`
    addItem(product, quantity, variant)

    toast.success(`${product.name} added to bag`, {
      description: `${quantity}x ${variant}`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      action: {
        label: 'View Bag',
        onClick: () => navigate('/cart'),
      },
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const increment = () => setQuantity((q) => Math.min(q + 1, product.stock))
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1))

  return (
    <div className="space-y-8 mt-10">
      {/* Variant Selectors */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Select Color
            </h3>
            <span className="text-sm font-medium text-foreground">{selectedColor}</span>
          </div>
          <div className="flex gap-3">
            {product.colors?.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${
                  selectedColor === color.name
                    ? 'border-primary scale-110'
                    : 'border-transparent hover:border-muted-foreground/30'
                }`}
              >
                <div
                  className="w-full h-full rounded-full border border-border/20 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Select Size
            </h3>
            <span className="text-sm font-medium text-primary">Size Chart</span>
          </div>
          <ToggleGroup
            value={[selectedSize]}
            onValueChange={(val) => val[0] && setSelectedSize(val[0])}
            className="justify-start gap-2"
          >
            {product.sizes?.map((size) => (
              <ToggleGroupItem
                key={size}
                value={size}
                className="w-12 h-12 rounded-lg border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5 font-semibold text-sm transition-all"
              >
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {/* Quantity control */}
        <div className="flex items-center justify-between border-2 border-border/50 rounded-xl px-4 h-14 bg-accent/30 sm:w-44">
          <button
            onClick={decrement}
            className="p-1.5 rounded-md hover:bg-background text-foreground/80 transition-colors disabled:opacity-30"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-bold tabular-nums w-8 text-center">{quantity}</span>
          <button
            onClick={increment}
            className="p-1.5 rounded-md hover:bg-background text-foreground/80 transition-colors disabled:opacity-30"
            disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1 h-14 text-lg font-bold"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          Add to Bag
        </Button>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full h-14 text-lg font-bold border-2 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors duration-300"
        onClick={handleBuyNow}
        disabled={product.stock <= 0}
      >
        <CreditCard className="w-5 h-5 mr-3" />
        Buy Now
      </Button>
    </div>
  )
}
