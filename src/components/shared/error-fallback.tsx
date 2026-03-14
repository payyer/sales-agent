import { Button } from '@/components/ui/button'

interface ErrorFallbackProps {
  error: unknown
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Hệ thống gặp sự cố ngoài ý muốn.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="rounded-lg bg-destructive/10 p-8 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-destructive">Đã có lỗi xảy ra!</h2>
        <p className="mb-6 text-muted-foreground">{errorMessage}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={resetErrorBoundary}>Thử lại</Button>
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}
