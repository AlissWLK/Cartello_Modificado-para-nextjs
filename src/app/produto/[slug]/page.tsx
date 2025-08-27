'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase, Product } from '@/lib/supabase'
import Header from '@/components/Header'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (slug) {
      fetchProduct()
      fetchRelatedProducts()
    }
  }, [slug])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Erro ao buscar produto:', error)
        return
      }

      setProduct(data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('slug', slug)
        .limit(3)

      if (error) {
        console.error('Erro ao buscar produtos relacionados:', error)
        return
      }

      setRelatedProducts(data || [])
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const addToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: quantity
    }

    // Obter carrinho atual do localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartello-cart') || '[]')
    
    // Verificar se o produto já existe no carrinho
    const existingItemIndex = currentCart.findIndex((item: { id: number }) => item.id === product.id)
    
    if (existingItemIndex >= 0) {
      // Atualizar quantidade
      currentCart[existingItemIndex].quantity += quantity
    } else {
      // Adicionar novo item
      currentCart.push(cartItem)
    }

    // Salvar no localStorage
    localStorage.setItem('cartello-cart', JSON.stringify(currentCart))

    // Disparar evento customizado para atualizar contador
    window.dispatchEvent(new Event('cartUpdated'))

    // Mostrar feedback
    alert('Produto adicionado ao carrinho!')
  }

  const buyNow = () => {
    addToCart()
    // Redirecionar para checkout (implementar futuramente)
    alert('Redirecionando para o checkout...')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Início</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{product.category}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <Image
                src={product.image_url || '/placeholder-product.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Código: {product.code}</p>
                <p>Marca: {product.brand}</p>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.old_price && (
                  <span className="text-lg text-gray-500 line-through">
                    R$ {product.old_price.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Outras formas de pagamento</p>
              <div className="flex space-x-2">
                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">ELO</div>
                <div className="w-8 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center">AMEX</div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>

            {/* Buy Button */}
            <button
              onClick={buyNow}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🔒 Comprar
            </button>

            {/* Availability */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center text-green-800">
                <span className="text-sm">✓ Disponibilidade: Imediata</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Aproveite! Resta apenas {product.stock} unidade(s)
              </p>
            </div>

            {/* Shipping Calculator */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Calcule o frete</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md">
                  Calcular
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={addToCart}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🛒 Adicionar ao Carrinho
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Descrição' },
                { id: 'specifications', label: 'Especificações' },
                { id: 'reviews', label: 'Avaliações' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Descrição do Produto</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                {product.specifications && (
                  <div>
                    <h4 className="font-semibold mb-2">Características principais:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {product.specifications.split(', ').map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Marca:</span>
                      <span>{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Código:</span>
                      <span>{product.code}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Categoria:</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Estoque:</span>
                      <span>{product.stock} unidades</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Avaliações dos Clientes</h3>
                <div className="text-center py-8 text-gray-500">
                  <p>Ainda não há avaliações para este produto.</p>
                  <p className="text-sm mt-2">Seja o primeiro a avaliar!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produto/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100">
                      <Image
                        src={relatedProduct.image_url || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                      <p className="text-lg font-bold text-gray-900">
                        R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2025 Cartello Papel. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

