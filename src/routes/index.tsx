import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import NotFoundPage from '@/pages/not-found'
import { MainLayout } from '@/layouts/main-layout'
import { CartPage } from '@/pages/cart'

import { ProductDetailPage } from '@/pages/product-detail'

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
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
