'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface CartItem {
  id: number
  name: string
  price: number
  image_url: string
  quantity: number
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (isOpen) {
      loadCartItems()
    }
  }, [isOpen])

  const loadCartItems = () => {
    const savedCart = localStorage.getItem('cartello-cart')
    const items = savedCart ? JSON.parse(savedCart) : []
    setCartItems(items)
    
    // Calcular total
    const totalPrice = items.reduce((sum: number, item: CartItem) => 
      sum + (item.price * item.quantity), 0
    )
    setTotal(totalPrice)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedItems)
    localStorage.setItem('cartello-cart', JSON.stringify(updatedItems))
    
    // Recalcular total
    const totalPrice = updatedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )
    setTotal(totalPrice)
  }

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cartello-cart', JSON.stringify(updatedItems))
    
    // Recalcular total
    const totalPrice = updatedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )
    setTotal(totalPrice)
  }

  const checkout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }

    // Simular checkout
    console.log('Checkout data:', {
      items: cartItems,
      total: total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    })
    
    alert('Redirecionando para o checkout...')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Meu Carrinho</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-2">Seu carrinho está vazio</p>
              <p className="text-gray-400 text-sm">Adicione alguns produtos para continuar</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url || '/placeholder-product.jpg'}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-purple-600 font-bold text-sm">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-purple-600">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <button
              onClick={checkout}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🔒 Finalizar Compra
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

