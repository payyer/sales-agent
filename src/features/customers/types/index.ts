export interface Customer {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  spent: string
}

export interface CustomerQueryResponse {
  data: Customer[]
  total: number
}
