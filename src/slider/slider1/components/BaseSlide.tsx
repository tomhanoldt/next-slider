import { ComponentChild } from 'preact'
import { FC } from 'preact/compat'
import { Slide, humanizeKey } from '@lib/next-slider'
import { SlideProps } from '@lib/next-slider'
import { Typography } from '@lib/next-slider-ui'
import { twMerge } from 'tailwind-merge'

import { SliderBox } from './SliderBox'

export type BaseSlideProps = SlideProps & {
  headline?: ComponentChild
}

export const BaseSlide: FC<BaseSlideProps> = ({
  children,
  headline,
  ...props
}) => {
  props.className = twMerge(
    'flex flex-col text-center items-center justify-center max-w-[800px] md:min-w-[600px] w-full bg-white mx-auto',
    props.className,
  )

  return (
    <Slide {...props}>
      <SliderBox id='slider-box'>
        <Typography.Headline className='headline text-4xl p-10 font-bold m-'>
          {headline ?? humanizeKey(props.id)}
        </Typography.Headline>

        {children}
      </SliderBox>
    </Slide>
  )
}
