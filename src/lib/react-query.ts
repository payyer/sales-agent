import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    // Senior tip: Thay đổi các giá trị mặc định để tránh gọi API quá nhiều
    staleTime: 1000 * 60 * 5, // Dữ liệu được coi là mới trong 5 phút
    gcTime: 1000 * 60 * 60 * 24, // Giữ dữ liệu trong cache 24h (Garbage Collection)
    retry: false, // Không tự động gọi lại nếu lỗi (có thể tùy chỉnh cho từng query)
    refetchOnWindowFocus: false, // Không tự động fetch lại khi nhấn vào lại tab
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
