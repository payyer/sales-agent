import type { Tables } from '@/types/database.types'

// Basic Product type from Supabase
export type Product = Tables<'products'>

// If we need to ensure certain fields are not null for the UI,
// or if we want to extend the DB type with UI-specific state.
export interface ProductWithUI extends Product {
  // Overriding some nullable fields from DB to be safer in UI
  images: string[] // We can default to [] in the API layer
  category: string
  sizes: string[]
  colors: { name: string; hex: string }[]
}

export interface ProductVariant {
  id: string
  name: string // e.g., "M", "L", "Blue"
  sku: string
  stock: number
  priceOverride?: number
}

// Since we don't have a 'categories' table yet, we can keep this manual
// or derive it from the product category string if needed.
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
