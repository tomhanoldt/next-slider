import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'preact/compat'

import { useSlider } from '../hooks'

export type SlideProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    id: string
    index?: number
    style?: CSSProperties
    className?: string
    canLeave?: () => Promise<boolean>
    beforeLeave?: () => Promise<void>
    afterLeave?: () => Promise<void>
    beforeShow?: () => Promise<void>
    afterShow?: () => Promise<void>
    nextSlideId?: string
  }

export type SlideType = FC<SlideProps> & {
  props?: SlideProps
}

export const Slide: SlideType = ({ children, ...props }) => {
  const { updateSlideProps } = useSlider()

  updateSlideProps(props.id, props)

  props.className = `${props.className} nx-slide`

  return <div {...props}>{children}</div>
}
