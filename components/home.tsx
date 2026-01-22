"use client"

import { useMemo } from "react"
import { products } from "@/lib/products"
import { useFilters } from "@/contexts/filter-context"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { HeroCarousel } from "@/components/hero-carousel"
import { MarcasCarousel } from "@/components/marcas-carousel"
import { X } from "lucide-react"

// Asegúrate que NO tenga async aquí
export function HomeContent() {
  const { selectedBrand, selectedGender, searchQuery, setSelectedBrand, setSelectedGender, setSearchQuery, resetFilters } = useFilters()

  const brands = ["Nike", "Adidas", "Puma", "Converse", "New Balance"]
  const genders = [
    { name: "Hombre", value: "hombre" },
    { name: "Mujer", value: "mujer" },
    { name: "Niños", value: "niños" },
    { name: "Accesorios", value: "accesorios" }
  ]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = selectedBrand === null || product.brand === selectedBrand
      const matchesGender = selectedGender === null || product.gender === selectedGender
      const matchesSearch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesBrand && matchesGender && matchesSearch
    })
  }, [selectedBrand, selectedGender, searchQuery])

  const hasActiveFilters = selectedBrand !== null || selectedGender !== null || searchQuery !== ""

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de filtros secundaria - Diseño moderno */}
      <div className="hidden md:block sticky top-[89px] z-40 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b-2 border-blue-100 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {/* Etiqueta de marcas */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md flex-shrink-0">
              <span className="text-sm font-bold text-white whitespace-nowrap">🏃 Marcas</span>
            </div>

            <button
              onClick={() => setSelectedBrand(null)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-300 transform hover:scale-105 ${selectedBrand === null
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
            >
              ✨ Todas
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-300 transform hover:scale-105 ${selectedBrand === brand
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                  }`}
              >
                {brand}
              </button>
            ))}

            {/* Botón limpiar filtros */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-5 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full whitespace-nowrap flex-shrink-0 ml-auto transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                🔄 Limpiar Filtros
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {!hasActiveFilters && <HeroCarousel />}
        {!hasActiveFilters && <MarcasCarousel />}

        <div className="container mx-auto px-4 py-8">
          {/* Filtros aplicados arriba */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600">Mostrando:</span>
                    <span className="text-lg font-bold text-brand-primary">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedGender && (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-xs font-semibold text-gray-500">Género:</span>
                        <span className="text-sm font-medium text-gray-800">
                          {genders.find(g => g.value === selectedGender)?.name}
                        </span>
                        <button
                          onClick={() => setSelectedGender(null)}
                          className="text-gray-400 hover:text-brand-primary transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {selectedBrand && (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-xs font-semibold text-gray-500">Marca:</span>
                        <span className="text-sm font-medium text-gray-800">
                          {selectedBrand}
                        </span>
                        <button
                          onClick={() => setSelectedBrand(null)}
                          className="text-gray-400 hover:text-brand-primary transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {searchQuery && (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-xs font-semibold text-gray-500">Búsqueda:</span>
                        <span className="text-sm font-medium text-gray-800">
                          "{searchQuery}"
                        </span>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-gray-400 hover:text-brand-primary transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={resetFilters}
                      className="text-sm text-brand-primary hover:underline font-medium whitespace-nowrap"
                    >
                      Limpiar todo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid de productos */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}