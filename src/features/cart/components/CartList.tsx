import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/stores/cart.store'
import { CartItem } from './CartItem'
import { useTranslation } from 'react-i18next'

export const CartList = () => {
  const { items, getTotalItems } = useCartStore()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h2 className="text-sm font-black text-foreground uppercase tracking-widest">
          {t('cart.list.title', { defaultValue: 'Your Cart' })}
        </h2>

        <span className="bg-muted px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-widest text-muted-foreground border border-border/50">
          {getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <ScrollArea className="flex-1 pr-6 -mr-6">
        <div className="space-y-2">
          {items.map((item) => (
            <CartItem key={`${item.id}-${item.selectedVariant}`} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
