"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link href={`/productos/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 md:gap-3 p-2 md:p-4">
          <div className="w-full">
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
            <h3 className="font-semibold text-sm md:text-lg mt-0.5 md:mt-1 line-clamp-2">{product.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 hidden md:block">{product.category}</p>
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-lg md:text-2xl font-bold">${product.price}</span>
            <Button onClick={handleAddToCart} size="sm" className="text-xs md:text-sm px-2 md:px-4 h-8 md:h-9">
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden md:inline">Agregar</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
