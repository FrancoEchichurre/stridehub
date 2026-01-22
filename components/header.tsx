"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HeaderProps {
  onResetFilters?: () => void
  selectedBrand?: string | null
  selectedGender?: string | null
  searchQuery?: string
  onBrandChange?: (brand: string | null) => void
  onGenderChange?: (gender: string | null) => void
  onSearchChange?: (query: string) => void
  brands?: string[]
  genders?: Array<{ name: string; value: string }>
}

export function Header({
  onResetFilters,
  selectedBrand,
  selectedGender,
  searchQuery,
  onBrandChange,
  onGenderChange,
  onSearchChange,
  brands = [],
  genders = []
}: HeaderProps) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onResetFilters) {
      onResetFilters()
    }
    router.push("/")
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="py-3">
          <div className="flex items-center gap-6">
            {/* Logo a la izquierda */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer flex-shrink-0 transform transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/stridehub-logo.png"
                alt="StrideHub"
                width={300}
                height={120}
                priority
                className="h-16 w-auto drop-shadow-lg"
              />
            </a>

            {/* Filtros en el centro */}
            {genders.length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  {genders.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => onGenderChange?.(selectedGender === gender.value ? null : gender.value)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${selectedGender === gender.value
                          ? "bg-brand-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                        }`}
                    >
                      {gender.name}
                    </button>
                  ))}
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                {/* Menú de Marcas */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                  >
                    Marcas
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[200px] z-10 animate-fade-in-down border border-gray-100">
                      <button
                        onClick={() => {
                          onBrandChange?.(null)
                          setIsMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-200 ${selectedBrand === null ? "bg-brand-primary text-white hover:bg-blue-700" : ""
                          }`}
                      >
                        Todas las marcas
                      </button>
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => {
                            onBrandChange?.(brand)
                            setIsMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-200 ${selectedBrand === brand ? "bg-brand-primary text-white hover:bg-blue-700" : ""
                            }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Espaciador */}
            <div className="flex-1"></div>

            {/* Buscador a la derecha */}
            {onSearchChange && (
              <div className="w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery || ""}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 focus:shadow-md"
                  />
                </div>
              </div>
            )}

            {/* Carrito */}
            <Link href="/carrito" className="flex-shrink-0 ml-auto">
              <Button
                variant="outline"
                className="relative bg-white hover:bg-gray-100 border-2 border-gray-300 hover:border-brand-primary transition-all duration-300 shadow-md hover:shadow-lg px-4 py-4 rounded-xl hover:scale-105"
              >
                <ShoppingCart className="h-6 w-6 transition-transform duration-300 hover:rotate-12 text-brand-primary" strokeWidth={2.5} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md border-2 border-white animate-pulse bg-brand-secondary text-white"
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </header>
  )
} 