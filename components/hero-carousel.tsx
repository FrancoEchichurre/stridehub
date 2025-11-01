"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const heroSlides = [
  {
    id: 1,
    image: "/nike-air-max-270-running-shoes.jpg",
    title: "Últimas Novedades en Running",
    subtitle: "Descubre la nueva colección Nike Air Max",
    description: "Tecnología de vanguardia para tus entrenamientos"
  },
  {
    id: 2,
    image: "/adidas-ultraboost-running-shoes.jpg",
    title: "Performance sin Límites",
    subtitle: "Adidas Ultraboost - La revolución continúa",
    description: "Máxima comodidad y energía en cada paso"
  },
  {
    id: 3,
    image: "/nike-lebron-basketball-shoes.jpg",
    title: "Domina la Cancha",
    subtitle: "Colección Basketball 2024",
    description: "Equipamiento profesional para tu mejor juego"
  },
  {
    id: 4,
    image: "/puma-rs-x-casual-sneakers.jpg",
    title: "Estilo Urbano",
    subtitle: "Nuevas tendencias en casual",
    description: "La combinación perfecta entre moda y confort"
  }
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div className={`text-center text-white max-w-4xl transition-all duration-700 delay-300 ${
              index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 drop-shadow-xl font-light">
                {slide.subtitle}
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-lg opacity-90 hidden sm:block">
                {slide.description}
              </p>
              <button className="mt-4 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-[#ee4023] hover:bg-[#d63820] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Ver Colección
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-12 h-2 sm:h-3 bg-[#ee4023]'
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}