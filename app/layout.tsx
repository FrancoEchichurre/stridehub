import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { FilterProvider } from "@/contexts/filter-context"
import { SimpleHeader } from "@/components/simple-header"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StrideHub - Premium Athletic Footwear",
  description: "Descubre la mejor selección de calzado deportivo y casual de marcas premium. StrideHub, tu destino para el calzado perfecto.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <FilterProvider>
            <SimpleHeader />
            {children}
          </FilterProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
