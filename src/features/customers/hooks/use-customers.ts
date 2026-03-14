import { useQuery } from '@tanstack/react-query'
import { customerService } from '../api/customer.service'

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getCustomers,
  })
}
