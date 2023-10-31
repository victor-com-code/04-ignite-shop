import { styled } from '../'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  cursor: 'pointer',
  backgroundColor: '$gray800',
  color: '$white',
  border: 'none',
  borderRadius: 6,
  padding: '0.75rem',

  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.75rem',

  position: 'relative',
  opacity: 0.9,

  span: {
    position: 'absolute',
    top: -7,
    right: -7,
    backgroundColor: '$green500',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: 1000,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',

    fontWeight: 'bold',
  },

  '&:disabled': {
    color: '$gray500',
  },

  '&:not(:disabled):hover': {
    opacity: 1,
  },
})
