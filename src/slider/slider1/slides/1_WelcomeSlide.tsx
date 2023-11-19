import { FC } from 'preact/compat'
import { SlideProps } from '@lib/next-slider'

import { BaseSlide, NavigationBar } from '../components'

export const WelcomeSlide: FC<SlideProps> = props => {
  return (
    <BaseSlide {...props} headline='Welcome!'>
      Let's get started with the questions!!! 🎉
      <br />
      <div className='text-[60px]'>🥁</div>
      <b>ROUND 1 </b>
      <NavigationBar />
    </BaseSlide>
  )
}
