import { ReactNode, createContext, useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  priceDisplay: string
  defaultPriceId: string
  quantity: number
}

interface ShoppingCartContextType {
  shoppingCart: Product[]
  totalValue: number
  addProductToShoppingCart: (product: Product) => void
  removeProductFromShoppingCart: (productId: string) => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<Product[]>([])
  const [totalValue, setTotalValue] = useState<number>()

  function addProductToShoppingCart(product: Product) {
    const productIsAlreadyInCart = shoppingCart.find(
      (item) => item.id === product.id,
    )

    if (productIsAlreadyInCart) {
      return setShoppingCart((state) => {
        return state.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          } else {
            return { ...item }
          }
        })
      })
    }

    setShoppingCart((state) => {
      return [...state, product]
    })
  }

  function removeProductFromShoppingCart(productId: string) {
    const shoppingCartWithoutDeletedOne = shoppingCart.filter((product) => {
      return product.id !== productId
    })

    setShoppingCart(shoppingCartWithoutDeletedOne)
  }

  function calculateTotalValue() {
    setTotalValue(
      shoppingCart.reduce((acc, product) => {
        return (acc += Number(product.price) * product.quantity)
      }, 0),
    )
  }

  useEffect(() => {
    calculateTotalValue()
  }, [shoppingCart])

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        totalValue,
        addProductToShoppingCart,
        removeProductFromShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
