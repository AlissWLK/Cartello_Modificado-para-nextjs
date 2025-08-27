'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CartModal from './CartModal'

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    // Atualizar contador do carrinho
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cartello-cart')
      const items = savedCart ? JSON.parse(savedCart) : []
      const count = items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
      setCartCount(count)
    }

    updateCartCount()

    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      updateCartCount()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Também escutar um evento customizado para mudanças no mesmo tab
    window.addEventListener('cartUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
    }
  }, [])

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
    // Atualizar contador após fechar o modal
    const savedCart = localStorage.getItem('cartello-cart')
    const items = savedCart ? JSON.parse(savedCart) : []
    const count = items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
    setCartCount(count)
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              Cartello Papel
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
                Início
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-purple-600 font-medium">
                Categorias
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-purple-600 font-medium">
                Sobre
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600">
                  🔍
                </button>
              </div>
              <button 
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                🛒 
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}

