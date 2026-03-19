import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/shared/error-fallback'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset state here if needed
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          richColors={false}
          closeButton
          toastOptions={{
            duration: 4000,
            classNames: {
              toast:
                'group !bg-background/80 !backdrop-blur-md !text-foreground !border-border !rounded-xl !shadow-lg !font-medium !p-4',
              description: '!text-muted-foreground !mt-1 !font-normal',
              actionButton:
                '!bg-primary !text-primary-foreground !rounded-lg hover:!bg-primary/90 transition-colors',
              cancelButton: '!bg-muted !text-muted-foreground !rounded-lg',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
