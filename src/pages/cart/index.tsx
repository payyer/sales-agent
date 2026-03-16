import { useCartStore } from '@/stores/cart.store'
import { CartList } from '@/features/cart/components/CartList'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { CartEmpty } from '@/features/cart/components/CartEmpty'
import { useTranslation } from 'react-i18next'

export const CartPage = () => {
  const { items } = useCartStore()
  const { t } = useTranslation()

  const isEmpty = items.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-16 lg:px-8 min-h-[70vh]">
      {!isEmpty && (
        <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight uppercase">
            {t('cart.page.title', { defaultValue: 'Shopping Bag' })}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('cart.page.subtitle', {
              defaultValue: 'Review your items and proceed to checkout.',
            })}
          </p>
        </div>
      )}

      {isEmpty ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main List - 7 Columns */}
          <div className="lg:col-span-7">
            <CartList />
          </div>

          {/* Summary Sidebar - 5 Columns */}
          <div className="lg:col-span-5">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
