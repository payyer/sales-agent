import apiClient from '@/api/api-client'
import type { LoginCredentials, AuthResponse } from '../types'

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', credentials)
  },

  logout: () => {
    return apiClient.post('/auth/logout')
  },

  getMe: (): Promise<AuthResponse> => {
    return apiClient.get('/auth/me')
  },
}
