"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 md:h-32 md:w-32 mx-auto text-muted-foreground mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">Agrega algunos productos para comenzar tu compra</p>
            <Link href="/">
              <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6">Ver Productos</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-12">Carrito de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      <div className="relative w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-1">{item.brand}</p>
                            <h3 className="font-bold text-lg md:text-2xl mb-1">{item.name}</h3>
                            <p className="text-sm md:text-base text-muted-foreground">Precio unitario: ${item.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-red-50 h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 md:mt-6">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-xs md:text-sm font-medium text-muted-foreground">Cantidad:</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 md:h-10 md:w-10"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <span className="w-12 md:w-16 text-center font-bold text-lg md:text-xl">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 md:h-10 md:w-10"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">Subtotal</p>
                            <p className="font-bold text-2xl md:text-3xl text-[#ee4023]">${item.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 md:top-24 shadow-xl">
                <CardContent className="p-5 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Resumen del Pedido</h2>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-base md:text-lg">${total}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold text-base md:text-lg text-green-600">Gratis</span>
                    </div>
                    <div className="border-t-2 pt-3 md:pt-4 flex justify-between font-bold text-xl md:text-2xl">
                      <span>Total</span>
                      <span className="text-[#ee4023]">${total}</span>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <Button className="w-full text-base md:text-lg py-5 md:py-6" size="lg">
                      Proceder al Pago
                    </Button>
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full text-base md:text-lg py-5 md:py-6 bg-transparent" size="lg">
                        Continuar Comprando
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs md:text-sm text-muted-foreground text-center">
                      <span className="font-semibold">🚚 Envío gratis</span> en compras superiores a $50.000
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
