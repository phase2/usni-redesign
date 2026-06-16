import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type CartContextType = {
  cartCount: number
  setCartCount: (n: number) => void
}

const CartContext = createContext<CartContextType>({ cartCount: 0, setCartCount: () => {} })

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  return <CartContext.Provider value={{ cartCount, setCartCount }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
