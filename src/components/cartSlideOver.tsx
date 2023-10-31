import * as Dialog from '@radix-ui/react-dialog'
import {
  CartDetails,
  CloseButton,
  Content,
  Overlay,
  ProductItem,
  ProductsList,
  PurchaseButton,
} from '../styles/components/cartSlideOver'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import { FormEvent, useContext, useState } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCart'
import { toCurrencyStyleFormat } from '../utils/formatter'
import axios from 'axios'

export default function CartSlideOver() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { shoppingCart, totalValue, removeProductFromShoppingCart } =
    useContext(ShoppingCartContext)

  async function handleRemoveProductFromCart(productId: string) {
    removeProductFromShoppingCart(productId)
  }

  async function handleBuyProduct(event: FormEvent) {
    event.preventDefault()

    const productsInfo = shoppingCart.map((product) => {
      return {
        defaultPriceId: product.defaultPriceId,
        quantity: product.quantity,
      }
    })

    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        productsInfo,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert(`Falha ao redirecionar ao checkout! ${err}`)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Sacola de compras</Dialog.Title>

        <CloseButton>
          <X size={22} />
        </CloseButton>

        <form onSubmit={(event) => handleBuyProduct(event)}>
          <ProductsList>
            {shoppingCart.length > 0 ? (
              shoppingCart.map((product) => {
                return (
                  <ProductItem
                    key={product.id}
                    href={`/product/${product.id}`}
                    prefetch={false}
                  >
                    <Image
                      src={product.imageUrl}
                      width={120}
                      height={110}
                      alt=""
                    />
                    <div>
                      <p>{product.name}</p>
                      <span>{product.priceDisplay}</span>
                      <span className="quantity">
                        {product.quantity} unidade(s)
                      </span>
                      <button
                        disabled={isCreatingCheckoutSession}
                        onClick={() => handleRemoveProductFromCart(product.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </ProductItem>
                )
              })
            ) : (
              <>Adicione produtos à sacola</>
            )}
          </ProductsList>

          <footer>
            <CartDetails>
              <div>
                <span>Quantidade</span>
                <span>{shoppingCart.length}</span>
              </div>
              <div className="highlighted">
                <span>Valor Total</span>
                <span>{toCurrencyStyleFormat(totalValue)}</span>
              </div>
            </CartDetails>
            <PurchaseButton type="submit">Finalizar compra</PurchaseButton>
          </footer>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
