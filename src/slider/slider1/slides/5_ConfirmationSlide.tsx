import { FC } from 'preact/compat'
import Confetti from 'react-confetti'
import { SlideProps } from '@lib/next-slider'
import { Button } from 'flowbite-react'

import { BaseSlide } from '../components'
import { useSessionStore } from '../data'

export const ConfirmationSlide: FC<SlideProps> = props => {
  const { session } = useSessionStore()

  const subject = encodeURIComponent('Slider-1 Lead-Submission')
  const body = encodeURIComponent(`
  Usage: ${(session.sliderUsage || []).join(', ')}
  Email: ${session.email}
`)

  return (
    <BaseSlide {...props} headline={<>Thank you!</>}>
      <Button
        color='primary'
        href={`mailto:tom@creative-workflow.berlin?subject=${subject}&body=${body}`}
        className='mx-auto'
      >
        Send collected data per Email 💌
      </Button>
      <br />
      <br />
      <div className='text-[60px]'>😜</div>
      <br />
      {/* TODO: load confetti dynamic */}
      <Confetti
        className='pointer-events-none absolute block w-[100%] left-0 right-0'
        numberOfPieces={300}
        recycle={false}
        width={'800px'}
      />
    </BaseSlide>
  )
}
