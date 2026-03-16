import type { ProductWithUI } from '@/features/products/types/product.types'

export interface CartItem extends ProductWithUI {
  quantity: number
  selectedVariant?: string
}

export interface CartState {
  items: CartItem[]
  addItem: (product: ProductWithUI, quantity?: number, variant?: string) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, variant?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}
