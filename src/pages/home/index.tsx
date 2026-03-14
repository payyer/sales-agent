import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Users, ShoppingCart, BarChart3 } from 'lucide-react'

export const HomePage = () => {
  const { t } = useTranslation()

  const stats = [
    { title: t('dashboard.stats.sales'), value: '128.5M', icon: BarChart3, color: 'text-blue-600' },
    {
      title: t('dashboard.stats.customers'),
      value: '1,240',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: t('dashboard.stats.orders'),
      value: '456',
      icon: ShoppingCart,
      color: 'text-orange-600',
    },
    {
      title: t('dashboard.stats.agents'),
      value: '85',
      icon: LayoutDashboard,
      color: 'text-purple-600',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.overview')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.welcome')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo doanh số chi tiết</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Biểu đồ đang được cập nhật...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chiến dịch mới nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">Chiến campaign {i}</p>
                    <p className="text-xs text-muted-foreground">Đã chạy được {i * 5} ngày</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Đang chạy
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
