import { useAuthStore } from '@/features/auth'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = () => {
    // Demo login: Trong thực tế sẽ gọi authApi.login
    setAuth({ id: '1', name: 'Admin', email: 'admin@example.com' }, 'dummy-token')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Chào mừng trở lại</h1>
          <p className="mt-2 text-sm text-gray-600">Đăng nhập để quản lý đại lý của bạn</p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogin}
            className="group relative flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Vào ngay hệ thống
          </button>
          <div className="text-center text-xs text-gray-400">
            Dành cho bản thử nghiệm Senior Setup
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
