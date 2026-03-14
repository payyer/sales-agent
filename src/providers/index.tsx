import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode } from 'react'
import { queryClient } from '@/lib/react-query'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools giúp debug query dễ dàng hơn, chỉ hiển thị ở môi trường dev */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
