import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/auth/login'
import NotFoundPage from '@/pages/not-found'
import { ProtectedRoute } from './protected-route'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    // Cấu trúc bọc các route cần bảo vệ
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // Thêm các trang admin, profile... vào đây
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
