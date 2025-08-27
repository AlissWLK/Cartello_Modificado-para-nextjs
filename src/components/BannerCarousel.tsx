'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Banner {
  id: number
  image: string
}

const banners: Banner[] = [
  {
    id: 1,
    image: 'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_papelaria_fofa.png',
  },
  {
    id: 2,
    image: 'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_material_escolar.jpg',
  },
  {
    id: 3,
    image: 'https://qvdysthcnzqudlfongep.supabase.co/storage/v1/object/public/product-images/banners/banner_papelaria_fofa.png',
  }
]

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleImageError = (bannerId: number) => {
    console.error('❌ Erro ao carregar banner:', banners.find(b => b.id === bannerId)?.image)
    setImageErrors(prev => ({ ...prev, [bannerId]: true }))
  }

  return (
    <section className="relative mx-4 mt-4 mb-8">
      <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {!imageErrors[banner.id] ? (
              <Image
                src={banner.image}
                alt={`Banner ${banner.id}`}
                fill
                className="object-cover"
                priority={index === 0}
                onError={() => handleImageError(banner.id)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg">Banner em carregamento...</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Botões de navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Banner anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Próximo banner"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentSlide + 1} de {banners.length}
        </div>
      </div>
    </section>
  )
}
