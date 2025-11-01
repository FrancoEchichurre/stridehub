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
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground text-lg mb-8">Agrega algunos productos para comenzar tu compra</p>
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-6">Ver Productos</Button>
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
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-12">Carrito de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">{item.brand}</p>
                            <h3 className="font-bold text-2xl mb-1">{item.name}</h3>
                            <p className="text-muted-foreground">Precio unitario: ${item.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-red-50 h-10 w-10"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground mr-2">Cantidad:</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-16 text-center font-bold text-xl">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                            <p className="font-bold text-3xl text-[#ee4023]">${item.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-lg">${total}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold text-lg text-green-600">Gratis</span>
                    </div>
                    <div className="border-t-2 pt-4 flex justify-between font-bold text-2xl">
                      <span>Total</span>
                      <span className="text-[#ee4023]">${total}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full text-lg py-6" size="lg">
                      Proceder al Pago
                    </Button>
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full text-lg py-6 bg-transparent" size="lg">
                        Continuar Comprando
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
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
