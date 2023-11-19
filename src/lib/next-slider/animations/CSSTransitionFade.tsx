import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CSSTransition } from 'react-transition-group'

export const CSSTransitionFade = styled(CSSTransition).withConfig({
  shouldForwardProp: prop => !['animationDurationMs'].includes(prop),
})<{ animationDurationMs?: number }>`
  &.item-enter {
    opacity: 0.0000001;
  }
  &.item-enter-active {
    opacity: 1;
    transition: ${({ animationDurationMs }) => animationDurationMs}ms ease-in;
  }
  &.item-exit {
    opacity: 1;
  }
  &.item-exit-active {
    opacity: 0.0000001;
    transition: ${({ animationDurationMs }) => animationDurationMs}ms ease-out;
  }
`
