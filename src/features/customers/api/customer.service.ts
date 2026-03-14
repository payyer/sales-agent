import apiClient from '@/api/api-client'
import type { Customer } from '../types'

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    // Demo logic - sẽ dùng apiClient trong thực tế
    console.log('Using API client:', apiClient.defaults.baseURL)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'vana@example.com',
            status: 'active',
            spent: '12.5M',
          },
          {
            id: '2',
            name: 'Trần Thị B',
            email: 'thib@example.com',
            status: 'active',
            spent: '8.2M',
          },
          {
            id: '3',
            name: 'Lê Văn C',
            email: 'vanc@example.com',
            status: 'inactive',
            spent: '0M',
          },
        ])
      }, 500)
    })
  },
}
