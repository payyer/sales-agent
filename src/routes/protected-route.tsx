import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    // Nếu chưa login, redirect về trang login
    return <Navigate to="/login" replace />
  }

  // Nếu đã login, cho phép truy cập vào các route con (Outlet)
  return <Outlet />
}
