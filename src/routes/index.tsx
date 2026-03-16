import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import NotFoundPage from '@/pages/not-found'
import { MainLayout } from '@/layouts/main-layout'
import { CartPage } from '@/pages/cart'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
