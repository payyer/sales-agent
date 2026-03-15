import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import nProgress from 'nprogress'
import { Navbar } from '@/components/shared/navbar'
import { AgentRoot } from '@/features/sales-agent/components/AgentRoot'

export const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    nProgress.start()
    nProgress.done()
  }, [pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col">
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
      </div>
      <AgentRoot />
    </div>
  )
}
