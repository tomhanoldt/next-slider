import { FC, useState } from 'preact/compat'
import { SliderController } from '@lib/next-slider'
import { GoToIdButton } from '@lib/next-slider-ui'

import {
  WelcomeSlide,
  QuestionSlide,
  ContactSlide,
  SubmissionSlide,
  ConfirmationSlide,
} from './slides'
import { ProgressBar, SliderHeadline } from './components'
import { useIndexStore } from './data'

export const Slider1: FC = () => {
  const [loading, setLoading] = useState(false)

  const { getIndex, setIndex } = useIndexStore()

  return (
    <>
      <SliderHeadline>Next-Slider</SliderHeadline>

      <SliderController
        onReady={() => setLoading(false)}
        initialSlide={getIndex('question-multi-choice')}
        onShowSlide={(decorator, index) => {
          console.log(
            `Slider1 -> displaying slide: ${decorator.slide.props?.id}`,
          )

          // store index for restarting on same position
          setIndex(index)

          // scroll to headline (for smooth mobile ux)
          const elements = document.querySelectorAll('.headline')
          elements.forEach(el => el.scrollIntoView({ behavior: 'smooth' }))
        }}
        initialAnimationDurationMs={300}
        animationDurationMs={600}
        minHeight={300}
      >
        <WelcomeSlide id='start' />

        <QuestionSlide id='question-multi-choice' />

        <ContactSlide id='contact' />

        <SubmissionSlide id='submission' />

        <ConfirmationSlide id='confirmation' />
      </SliderController>

      <ProgressBar
        className='max-w-[800px] mx-auto'
        visible={!loading}
        shouldShow={state => {
          //  dont show on first slide && dont show on last slide (x < 100%)
          return state.step != 1 && state.percent < 100
        }}
      />

      <GoToIdButton id='start' color='white' className='mx-auto'>
        Restart!
      </GoToIdButton>
    </>
  )
}
