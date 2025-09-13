import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      const priceNum = Number(product.price)
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        )
      }
      return [
        ...prev,
        {
          ...product,
          price: isNaN(priceNum) ? 0 : priceNum,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const clearCart = () => setCart([])

  const updateQuantity = (id, qty) => {
    const q = Math.max(1, Number(qty) || 1)
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: q } : p)))
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
