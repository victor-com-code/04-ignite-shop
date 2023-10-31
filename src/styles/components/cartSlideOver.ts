import Link from 'next/link'
import { keyframes, styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

const translateLeft = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0%)' },
})

const translateRight = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(100%)' },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.50)',
})

export const Content = styled(Dialog.Content, {
  width: '30rem',
  height: '100vh',
  background: '$gray800',
  padding: '3rem',

  position: 'absolute',
  top: 0,
  right: 0,

  '&[data-state="closed"]': {
    animation: `${translateRight} 300ms`,
  },

  '&[data-state="open"]': {
    animation: `${translateLeft} 300ms`,
  },

  form: {
    height: '100%',
    padding: '1rem 0',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    footer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
    },
  },
})

export const CloseButton = styled(Dialog.Close, {
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  color: '$gray500',
  position: 'absolute',
  right: '1.5rem',
  top: '1.5rem',

  '&:hover': {
    color: '$gray300',
  },
})

export const ProductsList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.5rem',
})

export const ProductItem = styled(Link, {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  width: '100%',
  textDecoration: 'none',

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    flex: '1 0 0',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    span: {
      fontSize: '$md',
      fontWeight: 'bold',
      color: '$gray100',

      '&.quantity': {
        fontSize: '$sm',
      },
    },

    button: {
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      color: '$green500',
      fontSize: '$sm',
      fontWeight: 'bold',

      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const CartDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      fontSize: '$sm',
    },

    '&.highlighted span': {
      fontWeight: 'bold',
      fontSize: '$md',
    },
  },
})

export const PurchaseButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',
  backgroundColor: '$green500',
  border: 'none',
  borderRadius: '4px',
  color: '$white',

  padding: '1.25rem 2rem',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:hover': {
    backgroundColor: '$green300',
  },
})
