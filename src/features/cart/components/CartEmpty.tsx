import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export const CartEmpty = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 ring-8 ring-muted/30">
        <ShoppingBag className="h-10 w-10 text-muted-foreground/60" />
      </div>

      <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight">
        {t('cart.empty.title', { defaultValue: 'Your cart is empty' })}
      </h2>

      <p className="text-muted-foreground max-w-[280px] mb-8 leading-relaxed">
        {t('cart.empty.description', {
          defaultValue:
            "Looks like you haven't added anything to your cart yet. Let's find something amazing for you!",
        })}
      </p>

      <Button
        size="lg"
        className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => (window.location.href = '/')}
      >
        {t('cart.empty.cta', { defaultValue: 'Continue Shopping' })}
      </Button>
    </div>
  )
}
