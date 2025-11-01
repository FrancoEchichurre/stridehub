"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    resetFilters()
    router.push("/")
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGenderClick = (genderValue: string) => {
    setSelectedGender(selectedGender === genderValue ? null : genderValue)
    router.push("/")
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.length > 0) {
      router.push("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        {/* Desktop y Tablet Header */}
        <div className="hidden md:block py-3">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer flex-shrink-0 transform transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/victor-store.jpg"
                alt="Victor Store"
                width={250}
                height={100}
                priority
                className="h-12 lg:h-16 w-auto drop-shadow-lg"
              />
            </a>

            {/* Filtros de género - ocultos en tablet pequeña */}
            <div className="hidden lg:flex items-center gap-2">
              {genders.map((gender) => (
                <button
                  key={gender.value}
                  onClick={() => handleGenderClick(gender.value)}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedGender === gender.value
                      ? "bg-[#ee4023] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {gender.name}
                </button>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Buscador */}
            <div className="relative w-48 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee4023] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Carrito */}
            <Link href="/carrito" className="relative group flex-shrink-0">
              <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-2 lg:py-3 bg-[#ee4023] hover:bg-[#d63820] rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <ShoppingBag className="h-5 lg:h-6 w-5 lg:w-6 text-white" strokeWidth={2} />
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs text-white/90 font-medium leading-none">Mi Carrito</span>
                  <span className="text-sm text-white font-bold leading-none mt-1">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse border-2 border-white">
                    {totalItems}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden py-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Logo móvil */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/victor-store.jpg"
                alt="Victor Store"
                width={200}
                height={80}
                priority
                className="h-10 w-auto drop-shadow-lg"
              />
            </a>

            {/* Carrito móvil */}
            <Link href="/carrito" className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-[#ee4023] rounded-full shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" strokeWidth={2} />
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Buscador móvil */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee4023] focus:border-transparent"
            />
          </div>

          {/* Filtros de género móvil */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {genders.map((gender) => (
              <button
                key={gender.value}
                onClick={() => handleGenderClick(gender.value)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                  selectedGender === gender.value
                    ? "bg-[#ee4023] text-white shadow-md"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {gender.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
