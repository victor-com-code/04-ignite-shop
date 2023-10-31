import Link from 'next/link'
import Image from 'next/image'
import { HeaderContainer, CartButton } from '../styles/components/header'
import { Handbag } from '@phosphor-icons/react'
import logoImg from '../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import CartSlideOver from './cartSlideOver'
import { useContext } from 'react'
import { ShoppingCartContext } from '../contexts/ShoppingCart'

export default function Header() {
  const { shoppingCart } = useContext(ShoppingCartContext)

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <CartButton>
            <Handbag size={24} />
            {shoppingCart && shoppingCart.length > 0 && (
              <span>{shoppingCart.length}</span>
            )}
          </CartButton>
        </Dialog.Trigger>

        <CartSlideOver />
      </Dialog.Root>
    </HeaderContainer>
  )
}
