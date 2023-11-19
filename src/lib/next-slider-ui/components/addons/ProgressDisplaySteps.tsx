// import styled from 'styled-components'
import { FC } from 'preact/compat'
import { useProgress } from '@lib/next-slider'

import { ProgressProps } from './types'

export const ProgressDisplaySteps: FC<ProgressProps> = ({
  minimum,
  offset,
}) => {
  const { max, step } = useProgress(offset, minimum)

  return (
    <>
      {step}/{max}
    </>
  )
}
