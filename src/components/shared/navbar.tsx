import { Search, ShoppingBag, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/stores/app.store'
import { useCartStore } from '@/stores/cart.store'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

export const Navbar = () => {
  const { t } = useTranslation()
  const { isSidebarOpen, toggleSidebar } = useAppStore()
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden mr-2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
                <SheetHeader className="p-6 text-left">
                  <SheetTitle className="text-xl font-black tracking-tighter uppercase">
                    Payyer
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-6 p-6 pt-0">
                  <Link
                    to="/new-arrivals"
                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    {t('dashboard.menu.new_arrivals')}
                  </Link>
                  <Link
                    to="/about"
                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    {t('dashboard.menu.about')}
                  </Link>
                </nav>

                <div className="mt-auto p-6 space-y-4">
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-semibold">
                      Support
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/contact"
                        className="text-sm cursor-pointer hover:underline"
                        onClick={toggleSidebar}
                      >
                        Contact Us
                      </Link>
                      <Link
                        to="/faq"
                        className="text-sm cursor-pointer hover:underline"
                        onClick={toggleSidebar}
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              to="/"
              className="flex items-center cursor-pointer group transition-opacity hover:opacity-80"
            >
              <span className="text-xl font-black tracking-tighter text-foreground uppercase">
                Payyer
              </span>
            </Link>
          </div>

          {/* Navigation Links - Centered (Desktop) */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-sm text-muted-foreground absolute left-1/2 -translate-x-1/2">
            <Link
              to="/new-arrivals"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {t('dashboard.menu.new_arrivals')}
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors cursor-pointer">
              {t('dashboard.menu.about')}
            </Link>
          </nav>

          {/* Search and Cart - Right */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors cursor-text" />
              <input
                type="text"
                placeholder="Search products..."
                className="h-9 w-48 lg:w-64 rounded-full bg-muted/50 pl-10 pr-4 text-xs font-medium outline-none border border-transparent focus:border-muted-foreground/20 focus:bg-white transition-all underline-offset-4"
              />
            </div>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-transparent cursor-pointer group transition-transform hover:scale-110 active:scale-95"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white leading-none">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
