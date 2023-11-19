import { FC } from 'preact/compat'
import { useSlider } from '@lib/next-slider'

import { BaseButton, BaseButtonProps } from './BaseButton'

export const GoToIdButton: FC<
  BaseButtonProps & { id: string; skipValidation: boolean }
> = ({ children, id, skipValidation, ...props }) => {
  const { gotoId } = useSlider()

  return (
    <BaseButton onClick={() => gotoId(id, true)} {...props}>
      {children ?? `goto ${id}`}
    </BaseButton>
  )
}
