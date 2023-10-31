import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import {
  ControlButton,
  ControlGradient,
} from '../styles/components/arrowControls'

interface ArrowControlsProps {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}

export default function ArrowControls({
  disabled,
  left,
  onClick,
}: ArrowControlsProps) {
  return (
    <ControlGradient className={`${left ? 'left' : 'right'}`}>
      <ControlButton
        onClick={onClick}
        disabled={disabled}
        className={`${left ? 'control-left' : 'control-right'}`}
      >
        {left && <CaretLeft size={36} />}
        {!left && <CaretRight size={36} />}
      </ControlButton>
    </ControlGradient>
  )
}
