import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, ShoppingCart, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/features/auth'
import { useAppStore } from '@/stores/app.store'

const menuItems = [
  { icon: LayoutDashboard, label: 'Bảng điều khiển', href: '/' },
  { icon: Users, label: 'Khách hàng', href: '/customers' },
  { icon: ShoppingCart, label: 'Đơn hàng', href: '/orders' },
  { icon: Settings, label: 'Cài đặt', href: '/settings' },
]

export const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuthStore()
  const { isSidebarOpen } = useAppStore()

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
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
