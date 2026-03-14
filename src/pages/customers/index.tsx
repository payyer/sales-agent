import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

// Định nghĩa kiểu dữ liệu cho khách hàng
interface Customer {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  spent: string
}

// Giả lập dữ liệu
const data: Customer[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'vana@example.com', status: 'active', spent: '12.5M' },
  { id: '2', name: 'Trần Thị B', email: 'thib@example.com', status: 'active', spent: '8.2M' },
  { id: '3', name: 'Lê Văn C', email: 'vanc@example.com', status: 'inactive', spent: '0M' },
  { id: '4', name: 'Phạm Minh D', email: 'minhd@example.com', status: 'active', spent: '5.1M' },
  { id: '5', name: 'Hoàng Anh E', email: 'anhe@example.com', status: 'active', spent: '15.7M' },
  // Thêm dữ liệu để test pagination
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `customer-${i + 6}`,
    name: `Khách hàng ${i + 6}`,
    email: `customer${i + 6}@test.com`,
    status: (i % 3 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
    spent: `${(Math.random() * 10).toFixed(1)}M`,
  })),
]

export const CustomersPage = () => {
  const columns: ColumnDef<Customer>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tên khách hàng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge variant={status === 'active' ? 'success' : 'secondary'}>
            {status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'spent',
      header: 'Đã chi tiêu',
    },
    {
      id: 'actions',
      cell: () => {
        return (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản lý khách hàng</h2>
        <p className="text-muted-foreground">Danh sách khách hàng trong hệ thống của bạn.</p>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  )
}
