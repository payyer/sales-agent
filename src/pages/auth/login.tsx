import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setAuth(
            {
              id: '1',
              email: data.email,
              name: 'Admin User',
            },
            'fake-jwt-token',
          )
          resolve(true)
        }, 1000)
      }),
      {
        loading: t('auth.logging_in'),
        success: () => {
          navigate('/')
          return t('auth.login_success')
        },
        error: t('auth.login_failed'),
      },
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t('auth.login_title')}</CardTitle>
          <CardDescription>{t('auth.login_subtitle')}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.email')}</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t('auth.logging_in') : t('auth.login_button')}
              </Button>
              <div className="text-center text-xs text-muted-foreground uppercase">
                {t('auth.demo_notice')}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
