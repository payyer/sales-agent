import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { HomeIcon, Search } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-background">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-muted/20 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-24 h-24 text-primary animate-pulse opacity-50" />
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
        Oops! Page not found.
      </h2>

      <p className="max-w-md text-muted-foreground text-lg mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <Link
        to="/"
        className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-10 h-12 font-semibold')}
      >
        <HomeIcon className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
