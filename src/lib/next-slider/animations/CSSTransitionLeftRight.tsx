import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CSSTransition } from 'react-transition-group'

export const CSSTransitionLeftRight = styled(CSSTransition).withConfig({
  shouldForwardProp: prop => !['animationDurationMs'].includes(prop),
})<{ animationDurationMs?: number }>`
  &.forward-enter {
    transform: translateX(100%);
  }
  &.forward-enter-active {
    transform: translateX(0);
    transition: ${({ animationDurationMs }) => animationDurationMs}ms
      ease-in-out;
  }
  &.forward-exit {
    transform: translateX(0);
  }
  &.forward-exit-active {
    transform: translateX(-100%);
    transition: ${({ animationDurationMs }) => animationDurationMs}ms
      ease-in-out;
  }

  &.backward-enter {
    transform: translateX(-100%);
  }
  &.backward-enter-active {
    transform: translateX(0);
    transition: ${({ animationDurationMs }) => animationDurationMs}ms
      ease-in-out;
  }
  &.backward-exit {
    transform: translateX(0);
  }
  &.backward-exit-active {
    transform: translateX(100%);
    transition: ${({ animationDurationMs }) => animationDurationMs}ms
      ease-in-out;
  }

  &.initial-enter {
    opacity: 0.0000001;
  }
  &.initial-enter-active {
    opacity: 1;
    transition: ${({ animationDurationMs }) => animationDurationMs}ms ease-in;
  }
  &.initial-exit {
    opacity: 1;
  }
  &.initial-exit-active {
    opacity: 0.0000001;
    transition: ${({ animationDurationMs }) => animationDurationMs}ms ease-out;
  }
`
