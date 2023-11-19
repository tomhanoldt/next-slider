import { FC, HTMLAttributes, PropsWithChildren } from 'preact/compat'
import styled from 'styled-components'

export const StyledHeadline = styled.div`
  z-index: 2;
  padding: 20px;

  font-size: 100px;
  line-height: 1;
  text-align: center;
  font-weight: bold;

  color: transparent;
  background-color: #bbb;
  text-shadow: 0px 1px 3px rgba(255, 255, 255, 0.8);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`

export type SliderHeadlineProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement>

export const SliderHeadline: FC<SliderHeadlineProps> = ({ children }) => {
  return <StyledHeadline id='slider-headline'>{children}</StyledHeadline>
}
