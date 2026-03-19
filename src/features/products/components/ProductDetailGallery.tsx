import { useState } from 'react'

interface ProductDetailGalleryProps {
  images: string[]
  name: string
}

export const ProductDetailGallery = ({ images, name }: ProductDetailGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0] || '')

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
        No image available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image container with premium hover zoom effect */}
      <div className="aspect-square bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm relative group cursor-crosshair">
        <img
          src={activeImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Thumbnail selection list */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === img
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <img src={img} alt={`${name} thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
