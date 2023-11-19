import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'preact/compat'
import styled from 'styled-components'

import { Spinner } from '.'

export type PlainSliderWrapperProps = {
  minHeight: number | string
  loading?: boolean
  heightAnimationDurationMs?: number
  id?: string
}

export type SliderWrapperProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'loading'
> &
  PropsWithChildren &
  PlainSliderWrapperProps

const StyledSliderWrapper = styled.div.withConfig({
  shouldForwardProp: prop =>
    !['loading', 'minHeight', 'heightAnimationDurationMs'].includes(prop),
})<PlainSliderWrapperProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  justify-content: center;
  align-items: flex-start;
  min-height: ${({ minHeight }) =>
    Number.isInteger(minHeight) ? `${minHeight}px` : minHeight};

  & > * {
    /* all children above each other in a stack and centered - Slides  */
    grid-column: 1;
    grid-row: 1;
    margin: 0 auto;
    width: 100%;
  }

  transition: height
    ${({ heightAnimationDurationMs, loading }) =>
      loading ? 0 : heightAnimationDurationMs}ms
    ease-in-out;

  ${({ loading }) => loading && '& > * { transition: none; opacity: 0; }'}
`

const StyledSpinner = styled(Spinner).withConfig({
  shouldForwardProp: prop => !['visible'].includes(prop),
})<{ loading?: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

export const SliderWrapper: FC<SliderWrapperProps> = ({
  loading,
  minHeight = 200,
  heightAnimationDurationMs = 200,
  children,
  id = 'slider-wrapper',
  ...props
}) => {
  props.style = { ...((props.style as CSSProperties) || {}) }

  return (
    <StyledSliderWrapper
      {...props}
      id={id}
      loading={loading ?? false}
      minHeight={minHeight}
      heightAnimationDurationMs={heightAnimationDurationMs}
    >
      {<StyledSpinner visible={loading ?? false} />}
      {/* attention children have to be rendered as the controller needs
      to them to be able to load them */}
      {children}
    </StyledSliderWrapper>
  )
}
