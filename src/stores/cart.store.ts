import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartState, CartItem } from '@/features/cart/types/cart.types'
import type { ProductWithUI } from '@/features/products/types/product.types'

const TAX_RATE = 0.08 // 8% tax

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: ProductWithUI, quantity = 1, variant) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.selectedVariant === variant,
          )

          if (existingItemIndex > -1) {
            const newItems = [...state.items]
            newItems[existingItemIndex].quantity += quantity
            return { items: newItems }
          }

          const newItem: CartItem = {
            ...product,
            quantity,
            selectedVariant: variant,
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId: string, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === productId && item.selectedVariant === variant),
          ),
        }))
      },

      updateQuantity: (productId: string, quantity: number, variant) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedVariant === variant
              ? { ...item, quantity }
              : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax()
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
