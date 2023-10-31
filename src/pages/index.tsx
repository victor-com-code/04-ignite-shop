import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { Handbag } from '@phosphor-icons/react'
import { useState } from 'react'
import ArrowControls from '../components/arrowControls'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const perView = 2

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <span className="icon">
                    <Handbag size={32} />
                  </span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>

      {loaded && instanceRef.current && (
        <>
          <ArrowControls
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current.prev()
            }
            disabled={currentSlide === 0}
          />

          <ArrowControls
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - perView
            }
          />
        </>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
