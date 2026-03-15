import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCard } from './ProductCard'
import type { Product } from '../types/product.types'

const MOCK_PRODUCTS: Product[] = [
  // ... existing products (shortened for clarity in request)
  {
    id: '1',
    name: 'Premium Essentials Hoodie',
    price: 85.0,
    category: 'Hoodies',
    images: ['/products/hoodie-white.png'],
    stock: 10,
  },
  {
    id: '2',
    name: 'Classic Midnight Hoodie',
    price: 85.0,
    category: 'Hoodies',
    images: ['/products/hoodie-black.png'],
    stock: 15,
  },
  {
    id: '3',
    name: 'Minimal Cotton Tee',
    price: 45.0,
    category: 'T-Shirts',
    images: ['/products/tshirt-beige.png'],
    stock: 20,
  },
  {
    id: '4',
    name: 'Oversized Sand Hoodie',
    price: 95.0,
    category: 'Hoodies',
    images: ['/products/hoodie-white.png'],
    stock: 5,
  },
  {
    id: '5',
    name: 'Daily Base Layer',
    price: 35.0,
    category: 'T-Shirts',
    images: ['/products/tshirt-beige.png'],
    stock: 25,
  },
  {
    id: '6',
    name: 'Structured Shell Jacket',
    price: 185.0,
    category: 'Outerwear',
    images: ['/products/hoodie-black.png'],
    stock: 8,
  },
]

export const ProductGrid = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Grid Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          Showing {MOCK_PRODUCTS.length} products
        </span>
        <div className="flex items-center gap-4">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] h-9 border-none bg-transparent font-black uppercase tracking-widest text-xs focus:ring-0 cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort By: Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
