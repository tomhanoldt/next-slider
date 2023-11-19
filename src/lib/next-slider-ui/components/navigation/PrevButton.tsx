import { FC } from 'preact/compat'
import { useSlider } from '@lib/next-slider'

import { BaseButton, BaseButtonProps } from './BaseButton'

export const PrevButton: FC<BaseButtonProps> = ({ children, ...props }) => {
  const { gotoPrev } = useSlider()

  return (
    <BaseButton onClick={() => gotoPrev()} {...props}>
      {children ?? <>&larr; Back</>}
    </BaseButton>
  )
}
