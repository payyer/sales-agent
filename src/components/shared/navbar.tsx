import { Menu, User } from 'lucide-react'
import { useAppStore } from '@/stores/app.store'
import { useAuthStore } from '@/features/auth'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
  const { toggleSidebar } = useAppStore()
  const { user } = useAuthStore()

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">SalesAgent</span>
            <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary sm:block">
              PRO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden text-right sm:block">
              <p className="font-medium leading-none">{user?.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
