import { FC } from 'preact/compat'
import styled from 'styled-components'
import { SliderState, useSlider } from '@lib/next-slider'

import { NextButton } from './NextButton'
import { PrevButton } from './PrevButton'
import { BaseButtonProps } from './BaseButton'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
`

export type NavigationBarProps = BaseButtonProps & {
  showNext?: (state: SliderState) => boolean
  showPrev?: (state: SliderState) => boolean
}

export const NavigationBar: FC<BaseButtonProps & { className?: string }> = ({
  className,
  showPrev = (state: SliderState) => state.index > 0,
  showNext = (state: SliderState) => state.index + 1 < state.slides.length,
  ...props
}) => {
  const state = useSlider()

  return (
    <Wrapper className={className}>
      {!showPrev(state) && <span />}
      {showPrev(state) && <PrevButton {...props} />}
      {showNext(state) && <NextButton {...props} />}
    </Wrapper>
  )
}
