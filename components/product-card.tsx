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
        <CardFooter className="flex flex-col items-start gap-3 p-4">
          <div className="w-full">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
            <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold">${product.price}</span>
            <Button onClick={handleAddToCart} size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
