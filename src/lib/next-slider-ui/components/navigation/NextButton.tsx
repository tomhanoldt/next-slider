import { FC } from 'preact/compat'
import { useSlider } from '@lib/next-slider'

import { BaseButton, BaseButtonProps } from './BaseButton'

export const NextButton: FC<BaseButtonProps> = ({ children, ...props }) => {
  const { gotoNext } = useSlider()

  return (
    <BaseButton
      onClick={() => {
        gotoNext()
      }}
      {...props}
    >
      {children ?? <>Continue &rarr; </>}
    </BaseButton>
  )
}
