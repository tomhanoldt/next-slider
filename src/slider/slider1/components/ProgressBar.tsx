import { FC } from 'preact/compat'
import {
  ProgressDisplaySteps,
  ProgressDisplayPercent,
  ProgressBarProps,
} from '@lib/next-slider-ui'
import { ProgressBar as BaseProgressBar } from '@lib/next-slider-ui'
import { twMerge } from 'tailwind-merge'

export const ProgressBar: FC<ProgressBarProps> = props => {
  props.className = twMerge('p-5 relative', props.className)

  return (
    <BaseProgressBar id='slider-progress-bar' {...props}>
      <b>
        <ProgressDisplaySteps offset={1} />
      </b>
      &nbsp;
      <small>
        (<ProgressDisplayPercent offset={1} />)
      </small>
    </BaseProgressBar>
  )
}
