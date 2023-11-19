// import styled from 'styled-components'
import { FC } from 'preact/compat'
import { useProgress } from '@lib/next-slider'

import { ProgressProps } from './types'

export const ProgressDisplayPercent: FC<Omit<ProgressProps, 'minimum'>> = ({
  offset,
}) => {
  const { percent } = useProgress(offset, 0)

  return <>{percent.toFixed(0)}%</>
}
