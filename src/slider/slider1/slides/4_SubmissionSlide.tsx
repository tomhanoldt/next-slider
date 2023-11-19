import { FC } from 'preact/compat'
import { SlideProps } from '@lib/next-slider'
import { NextButton } from '@lib/next-slider-ui'

import { BaseSlide } from '../components'

export const SubmissionSlide: FC<SlideProps> = props => {
  return (
    <BaseSlide {...props} headline='By clicking on:'>
      <NextButton color='primary' className='mt-8 mx-auto'>
        💪&nbsp;&nbsp;Show me the Love!&nbsp;&nbsp;🚀
      </NextButton>
      <br />
      <br />
      ...you will get to the last slide.
      <br />
      <br />
      <br />
    </BaseSlide>
  )
}
