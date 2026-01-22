"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

const genders = [
  { name: "Hombre", value: "hombre" },
  { name: "Mujer", value: "mujer" },
  { name: "Niños", value: "niños" },
  { name: "Accesorios", value: "accesorios" }
]

export function SimpleHeader() {
  const { selectedGender, setSelectedGender, searchQuery, setSearchQuery, resetFilters } = useFilters()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    resetFilters()
    router.push("/")
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGenderClick = (genderValue: string) => {
    setSelectedGender(selectedGender === genderValue ? null : genderValue)
    router.push("/")
    setIsMenuOpen(false)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.length > 0) {
      router.push("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 shadow-2xl">
      <div className="container mx-auto px-4">
        {/* Desktop y Tablet Header */}
        <div className="hidden md:block py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo - Texto estilizado */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer transform transition-all duration-300 hover:scale-110"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🏃</span>
                </div>
                <span className="text-2xl lg:text-3xl font-black text-white drop-shadow-2xl tracking-tight">
                  StrideHub
                </span>
              </div>
            </a>

            {/* Filtros de género - Estilo moderno */}
            <div className="hidden lg:flex items-center gap-2">
              {genders.map((gender) => (
                <button
                  key={gender.value}
                  onClick={() => handleGenderClick(gender.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedGender === gender.value
                    ? "bg-white text-blue-600 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    }`}
                >
                  {gender.name}
                </button>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Buscador - Diseño mejorado */}
            <div className="relative w-64 lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm rounded-full bg-white/90 backdrop-blur-md border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-300 placeholder:text-gray-500"
              />
            </div>

            {/* Carrito - Diseño premium */}
            <Link href="/carrito" className="relative group flex-shrink-0">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-white/30">
                <ShoppingBag className="h-6 w-6 text-white" strokeWidth={2.5} />
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs text-white/90 font-medium leading-none">Carrito</span>
                  <span className="text-sm text-white font-bold leading-none mt-1">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                    {totalItems}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all border-2 border-white/30"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Logo móvil - centrado */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer absolute left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">🏃</span>
                </div>
                <span className="text-xl font-black text-white drop-shadow-2xl tracking-tight">
                  StrideHub
                </span>
              </div>
            </a>

            {/* Carrito móvil */}
            <Link href="/carrito" className="relative">
              <div className="flex items-center justify-center w-11 h-11 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30">
                <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2.5} />
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="mt-4 space-y-3 pb-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-white/20">
              {/* Buscador móvil */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-full bg-white border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              {/* Filtros de género móvil */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-white uppercase px-1">Categorías</p>
                <div className="grid grid-cols-2 gap-2">
                  {genders.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => handleGenderClick(gender.value)}
                      className={`px-4 py-3 rounded-full text-sm font-semibold transition-all ${selectedGender === gender.value
                        ? "bg-white text-blue-600 shadow-lg"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                        }`}
                    >
                      {gender.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  )
}
