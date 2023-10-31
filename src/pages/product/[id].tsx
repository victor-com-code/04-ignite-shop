import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useContext, useState } from 'react'
import Head from 'next/head'
import { ShoppingCartContext } from '@/src/contexts/ShoppingCart'
import { toCurrencyStyleFormat } from '@/src/utils/formatter'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceDisplay: string
    description: string
    defaultPriceId: string
    quantity: number
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductToShoppingCart } = useContext(ShoppingCartContext)

  async function handleAddProductToCart() {
    const {
      id,
      name,
      imageUrl,
      price,
      priceDisplay,
      defaultPriceId,
      quantity,
    } = product

    addProductToShoppingCart({
      id,
      name,
      imageUrl,
      price,
      priceDisplay,
      defaultPriceId,
      quantity,
    })
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceDisplay}</span>

          <p>{product.description}</p>

          <button onClick={handleAddProductToCart}>Adicionar à sacola </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [{ params: { id: 'prod_OfzFCgHPGXdsoo' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        priceDisplay: toCurrencyStyleFormat(price.unit_amount as number),
        description: product.description,
        defaultPriceId: price.id,
        quantity: 1,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
