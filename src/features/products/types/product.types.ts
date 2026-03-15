export interface Product {
  id: string
  name: string
  description?: string
  price: number
  images: string[]
  category: string
  stock: number
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string // e.g., "M", "L", "Blue"
  sku: string
  stock: number
  priceOverride?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface ProductFilters {
  category?: string
  q?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
}
