import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/sidebar'
import { Navbar } from '@/components/shared/navbar'

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-8 lg:pl-72 lg:pr-8 pt-24">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
