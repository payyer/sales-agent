import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/auth/login'
import { CustomersPage } from '@/pages/customers'
import NotFoundPage from '@/pages/not-found'
import { ProtectedRoute } from './protected-route'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AuthLayout } from '@/layouts/auth-layout'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/customers',
            element: <CustomersPage />,
          },
          // Thêm các trang admin, profile... vào đây
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
