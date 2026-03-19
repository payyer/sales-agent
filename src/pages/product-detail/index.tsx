import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Home, Info, Truck, RotateCcw } from 'lucide-react'
import { useProductDetail } from '@/features/products/hooks/useProducts'
import { ProductDetailGallery } from '@/features/products/components/ProductDetailGallery'
import { ProductDetailInfo } from '@/features/products/components/ProductDetailInfo'
import { ProductDetailActions } from '@/features/products/components/ProductDetailActions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ProductWithUI } from '@/features/products/types/product.types'

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: rawProduct, isLoading, error } = useProductDetail(id)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted rounded-2xl" />
          <div className="space-y-6">
            <div className="h-4 bg-muted w-24 rounded" />
            <div className="h-12 bg-muted w-3/4 rounded" />
            <div className="h-8 bg-muted w-1/4 rounded" />
            <div className="h-32 bg-muted rounded" />
            <div className="h-14 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !rawProduct) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Return to Shop
        </Link>
      </div>
    )
  }

  // Ensure images and category are not null for components
  const product: ProductWithUI = {
    ...rawProduct,
    images: Array.isArray(rawProduct.images) ? rawProduct.images : [],
    category: rawProduct.category || 'Uncategorized',
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={`/?category=${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {/* Left: Gallery Section (Desktop 7 cols) */}
          <div className="md:col-span-7">
            <ProductDetailGallery images={product.images} name={product.name} />
          </div>

          {/* Right: Info Section (Desktop 5 cols) */}
          <div className="md:col-span-5 lg:pl-4">
            <ProductDetailInfo product={product} />
            <ProductDetailActions product={product} />

            {/* Supplemental Info Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-6 font-semibold">
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 shadow-none border-b-2 border-transparent"
                  >
                    <Info className="w-4 h-4 mr-2" /> Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 shadow-none border-b-2 border-transparent"
                  >
                    <Truck className="w-4 h-4 mr-2" /> Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    value="returns"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 shadow-none border-b-2 border-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Returns
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Designed for everyday versatility, this premium piece features sustainable
                    materials and reinforced stitching for durability.
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>100% Organic Cotton</li>
                    <li>Reinforced seams</li>
                    <li>Ethically sourced</li>
                    <li>Preshrunk for a perfect fit</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="text-sm text-muted-foreground">
                  Enjoy standard shipping on all orders. Expected delivery within 3-5 business days
                  for domestic shipping. Express options available at checkout.
                </TabsContent>
                <TabsContent value="returns" className="text-sm text-muted-foreground">
                  Not satisfied? We offer a 30-day hassle-free return policy. Items must be in
                  original condition with tags attached.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
