import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const handleLogin = () => {
    // Demo login: set fake user and token
    setAuth(
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin',
      },
      'fake-jwt-token',
    )
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Chào mừng trở lại</CardTitle>
          <CardDescription>Nhập thông tin để truy cập hệ thống quản lý</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleLogin}>
            Đăng nhập ngay (Demo)
          </Button>
          <div className="text-center text-xs text-muted-foreground uppercase">
            Bản thử nghiệm Senior Setup
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
