'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase, Product } from '@/lib/supabase'
import Header from '@/components/Header'
import BannerCarousel from '@/components/BannerCarousel'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar produtos:', error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1
    }

    // Obter carrinho atual do localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartello-cart') || '[]')
    
    // Verificar se o produto já existe no carrinho
    const existingItemIndex = currentCart.findIndex((item: { id: number }) => item.id === product.id)
    
    if (existingItemIndex >= 0) {
      // Atualizar quantidade
      currentCart[existingItemIndex].quantity += 1
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-pastel">
      <Header />

      {/* Carrossel de Banners */}
      <BannerCarousel />

      {/* Produtos em Destaque */}
      <section id="produtos" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-custom mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Descubra nossa seleção especial de papelaria fofa
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
              <p className="text-gray-400 text-sm mt-2">Verifique se os dados foram inseridos corretamente no Supabase.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={product.image_url || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <button
                        onClick={() => addToCart(product)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        🛒
                      </button>
                    </div>
                    <div className="p-6">
                      <Link href={`/produto/${product.slug}`}>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-gray-900">
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            {product.old_price && (
                              <span className="text-sm text-gray-500 line-through">
                                R$ {product.old_price.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link
                          href={`/produto/${product.slug}`}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all"
                        >
                          Ver mais
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">@Cartellopapel</h2>
          <p className="text-lg text-gray-600 mb-8">Inspiração diária de papelaria fofa</p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all">
            Seguir no Instagram
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-200 to-blue-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Receba nossas novidades</h2>
          <p className="text-lg text-gray-700 mb-8">
            Seja o primeiro a saber sobre lançamentos, promoções e dicas de papelaria fofa!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all">
              Inscrever-se
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Não enviamos spam. Seus dados estão seguros conosco.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Cartello Papel</h3>
              <p className="text-gray-400">
                Sua loja de papelaria fofa favorita
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Início</Link></li>
                <li><Link href="/categorias" className="hover:text-white">Categorias</Link></li>
                <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/categoria/cadernos" className="hover:text-white">Cadernos</Link></li>
                <li><Link href="/categoria/canetas" className="hover:text-white">Canetas</Link></li>
                <li><Link href="/categoria/kits" className="hover:text-white">Kits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contato@cartellopapel.com</li>
                <li>📱 (11) 99999-9999</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Cartello Papel. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
