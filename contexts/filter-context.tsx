"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FilterContextType {
  selectedBrand: string | null
  selectedGender: string | null
  searchQuery: string
  setSelectedBrand: (brand: string | null) => void
  setSelectedGender: (gender: string | null) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const resetFilters = () => {
    setSelectedBrand(null)
    setSelectedGender(null)
    setSearchQuery("")
  }

  return (
    <FilterContext.Provider
      value={{
        selectedBrand,
        selectedGender,
        searchQuery,
        setSelectedBrand,
        setSelectedGender,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
