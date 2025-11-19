import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import PaymentButton from './components/PaymentButton'; 

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/api/products/get-items').then(res => {
      setProducts(res.data.products)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id)
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) removeFromCart(id)
    else setCart(cart.map(item =>
      item._id === id ? { ...item, quantity } : item
    ))
  }

  const total = cart.reduce((sum, item) => sum + (item.price.amount * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">ShopHub</h1>
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
            <ShoppingCart size={20} />
            <span className="font-semibold">{cart.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Featured Products</h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-slate-500 text-lg">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{product.title}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{(product.price.amount ).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-slate-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                    {cart.map(item => (
                      <div key={item._id} className="border border-slate-200 rounded-lg p-4">
                        <p className="font-semibold text-slate-800 mb-2">{item.title}</p>
                        <p className="text-blue-600 font-bold mb-3">₹{(item.price.amount )}</p>
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="bg-slate-200 hover:bg-slate-300 p-1 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="bg-slate-200 hover:bg-slate-300 p-1 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="w-full text-red-600 hover:text-red-800 text-sm font-semibold flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between mb-4">
                      <p className="text-slate-700">Subtotal:</p>
                      <p className="font-bold text-slate-800">₹{(total )}</p>
                    </div>
                     <PaymentButton total={total}   />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
