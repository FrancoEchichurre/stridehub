"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { ShoppingCart, Heart, Truck, Shield, RefreshCw } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const availableSizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"]

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const productId = Number(params.id)
  const product = products.find((p) => p.id === productId)

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/">
          <Button>Volver a la tienda</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona un talle")
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen del producto */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          {/* Galería de miniaturas (opcional para futuras mejoras) */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((_, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:ring-2 ring-primary transition">
                <div className="relative aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} vista ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Marca y nombre */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-bold mt-1">{product.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{product.category}</p>
          </div>

          {/* Precio */}
          <div>
            <span className="text-4xl font-bold">${product.price}</span>
            <p className="text-sm text-muted-foreground mt-1">IVA incluido</p>
          </div>

          {/* Selector de talles */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-sm">Selecciona tu talle</label>
              <button className="text-sm text-primary hover:underline">Guía de talles</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border-2 rounded-lg font-semibold transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de cantidad */}
          <div>
            <label className="font-semibold text-sm block mb-3">Cantidad</label>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                className="w-12 h-12 border-2 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-12 h-12 border-2 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button onClick={handleAddToCart} size="lg" className="w-full text-lg py-6">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              {isFavorite ? "En favoritos" : "Agregar a favoritos"}
            </Button>
          </div>

          {/* Información adicional */}
          <Card className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Envío gratis</p>
                <p className="text-sm text-muted-foreground">En compras superiores a $50.000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Devoluciones gratis</p>
                <p className="text-sm text-muted-foreground">Hasta 30 días después de la compra</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Compra segura</p>
                <p className="text-sm text-muted-foreground">Protección al comprador garantizada</p>
              </div>
            </div>
          </Card>

          {/* Descripción */}
          <div>
            <h2 className="font-bold text-xl mb-3">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description ||
                `Los ${product.name} de ${product.brand} combinan estilo y rendimiento.
                Diseñados para ${product.category.toLowerCase()}, estos zapatos ofrecen
                comodidad excepcional y un diseño moderno que se adapta a cualquier ocasión.
                Fabricados con materiales de alta calidad para garantizar durabilidad y soporte.`}
            </p>
          </div>

          {/* Características */}
          <div>
            <h2 className="font-bold text-xl mb-3">Características</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Material exterior de alta calidad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Suela de goma resistente al desgaste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Sistema de amortiguación avanzado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Diseño ergonómico para máxima comodidad</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
