import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth.service'
import { useAuthStore } from '../stores/auth.store'

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
}

export const useUser = () => {
  const { isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getMe,
    enabled: isAuthenticated, // Chỉ fetch khi đã login
    // Senior tip: Tự động cập nhật store khi dữ liệu profile về
    select: (data) => {
      // Logic biến đổi dữ liệu nếu cần
      return data
    },
  })
}
