import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, ShoppingCart, Settings, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/features/auth'
import { useAppStore } from '@/stores/app.store'

export const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { logout } = useAuthStore()
  const { isSidebarOpen } = useAppStore()

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard.menu.dashboard'), href: '/' },
    { icon: Users, label: t('dashboard.menu.customers'), href: '/customers' },
    { icon: ShoppingCart, label: t('dashboard.menu.orders'), href: '/orders' },
    { icon: Settings, label: t('dashboard.menu.settings'), href: '/settings' },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-transform lg:translate-x-0',
        !isSidebarOpen && '-translate-x-full',
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {t('common.logout')}
        </button>
      </div>
    </aside>
  )
}
