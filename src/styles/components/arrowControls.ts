import { styled } from '..'

export const ControlGradient = styled('div', {
  position: 'absolute',
  height: '100%',
  width: '6rem',
  background:
    'linear-gradient(90deg, rgba(18, 18, 20, 0.00) 0%, rgba(18, 18, 20, 0.85) 100%)',

  '&.left': {
    left: '0rem',
  },

  '&.right': {
    right: '0rem',
  },
})

export const ControlButton = styled('button', {
  position: 'absolute',
  top: '50%',
  border: 'none',
  background: 'transparent',

  '&:not(:disabled)': {
    cursor: 'pointer',
    color: '$gray300',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    color: '$gray800',
  },

  '&.control-left': {
    left: '1rem',
  },

  '&.control-right': {
    right: '1rem',
  },
})
