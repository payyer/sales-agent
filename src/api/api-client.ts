import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

// 1. Cấu hình cơ bản
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s
})

// 2. Request Interceptor: Tự động gắn Token vào mỗi request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 3. Response Interceptor: Xử lý dữ liệu trả về và lỗi tập trung
apiClient.interceptors.response.use(
  (response) => {
    // Senior tip: Trả về trực tiếp data để component không phải gọi .data nhiều lần
    return response.data
  },
  (error: AxiosError) => {
    const status = error.response?.status

    // Xử lý lỗi Unauthorized (401) - Thường là Token hết hạn
    if (status === 401) {
      localStorage.removeItem('auth_token')
      // window.location.href = '/login' // Hoặc redirect bằng router
    }

    // Friendly error message cho UI
    const message =
      (error.response?.data as { message?: string })?.message || error.message || 'Đã có lỗi xảy ra'

    // Log lỗi ra hệ thống tracking (ví dụ Sentry) nếu cần
    console.error(`[API Error] ${status}: ${message}`)

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
    })
  },
)

export default apiClient
