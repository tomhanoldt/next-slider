import {
  FC,
  HTMLProps,
  PropsWithChildren,
  useCallback,
  useState,
} from 'preact/compat'
import styled from 'styled-components'
import {
  ComponentAnimationState,
  ProgressState,
  useProgress,
} from '@lib/next-slider'
import { Progress } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

import { ProgressProps } from './types'

const AnimatedProgress = styled(Progress).withConfig({
  shouldForwardProp: prop => !['animationDurationMs'].includes(prop),
})<{ animationDurationMs?: number }>`
  & > * {
    /* animate progressbar width */
    transition: all ${({ animationDurationMs }) => animationDurationMs}ms;
  }
`

const ShowHideAnimation = styled.div.withConfig({
  shouldForwardProp: prop => !['animationDurationMs'].includes(prop),
})<{ animationDurationMs?: number }>`
  transition: ${({ animationDurationMs }) => animationDurationMs}ms ease-in-out;
  overflow: hidden;

  &.display-state-showing,
  &.display-state-visible {
    opacity: 1;
    scale: 1;
  }

  &.display-state-hiding,
  &.display-state-hidden {
    opacity: 0.00001;
    scale: 0.000001;
  }
`

export type ProgressBarProps = PropsWithChildren &
  ProgressProps &
  HTMLProps<HTMLDivElement> & {
    childrenPosition?: 'top' | 'bottom'
    shouldShow?: (state: ProgressState) => boolean
    visible?: boolean
    animationDurationProgressMs?: number
    animationDurationShowHideMs?: number
  }

export const ProgressBar: FC<ProgressBarProps> = ({
  minimum,
  offset,
  children,
  className,
  childrenPosition = 'bottom',
  visible = true,
  animationDurationProgressMs = 800,
  animationDurationShowHideMs = 800,
  shouldShow = state => {
    return state.percent < 100
  },
  ...rest
}) => {
  const progressState = useProgress(offset, minimum)
  const [displayState, setDisplayState] =
    useState<ComponentAnimationState>('hidden')

  const dispatchAnimationStates = useCallback(() => {
    const shouldShowNow = shouldShow === undefined || shouldShow(progressState)

    if (shouldShowNow && displayState == 'hidden') {
      setDisplayState('showing')

      setTimeout(() => {
        setDisplayState('visible')
      }, animationDurationShowHideMs)
    }

    if (!shouldShowNow && displayState == 'visible') {
      setDisplayState('hiding')

      setTimeout(() => {
        setDisplayState('hidden')
      }, animationDurationShowHideMs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayState, progressState, shouldShow])

  dispatchAnimationStates()

  if (!visible) return <></>

  return (
    <ShowHideAnimation
      {...rest}
      className={
        (twMerge(
          `css-animation w-full text-center display-state-${displayState}`,
        ),
        className)
      }
      animationDurationMs={animationDurationShowHideMs}
    >
      {childrenPosition == 'top' && children}
      <AnimatedProgress
        progress={progressState.percent}
        animationDurationMs={animationDurationProgressMs}
        color='primary'
      />
      {childrenPosition == 'bottom' && children}
    </ShowHideAnimation>
  )
}
