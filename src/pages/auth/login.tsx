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
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg border p-8 shadow-sm">
        <h1 className="mb-4 text-xl font-bold">Đăng Nhập</h1>
        <button
          onClick={handleLogin}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Login Demo
        </button>
      </div>
    </div>
  )
}

export default LoginPage
