import { Truck, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart.store'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'

export const CartSummary = () => {
  const { getSubtotal, getTax, getTotal } = useCartStore()
  const { t } = useTranslation()

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-sm font-black text-foreground mb-6 uppercase tracking-widest">
        {t('cart.summary.title', { defaultValue: 'Order Summary' })}
      </h3>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            {t('cart.summary.subtotal', { defaultValue: 'Subtotal' })}
          </span>
          <span className="text-sm font-bold text-foreground">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t('cart.summary.shipping', { defaultValue: 'Shipping' })}
            </span>
            <span className="bg-green-500/10 text-green-500 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
              Free
            </span>
          </div>
          <span className="text-sm font-bold text-foreground">$0.00</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            {t('cart.summary.tax', { defaultValue: 'Tax (8%)' })}
          </span>
          <span className="text-sm font-bold text-foreground">${tax.toFixed(2)}</span>
        </div>

        <Separator className="my-2" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-base font-black text-foreground uppercase tracking-tight">
            {t('cart.summary.total', { defaultValue: 'Total' })}
          </span>
          <span className="text-2xl font-black text-foreground">${total.toFixed(2)}</span>
        </div>

        {/* Info badges */}
        <div className="grid grid-cols-2 gap-3 pt-6">
          <div className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-xl border border-border/50 text-center">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase text-muted-foreground leading-none">
              Free Delivery
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-xl border border-border/50 text-center">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase text-muted-foreground leading-none">
              Secure Payment
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button className="w-full h-14 mt-6 rounded-xl font-black text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
          {t('cart.summary.checkout', { defaultValue: 'Proceed to Checkout' })}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
