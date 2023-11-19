import { useSlider } from './useSlider'

export type ProgressState = {
  max: number
  percent: number
  step: number
  maxRaw: number
}

export const useProgress = (offset = 0, minimum = 2): ProgressState => {
  const { index, slides } = useSlider()

  // const relativeSub = (countLast === true ? 0 : -1) - offset
  const max = slides.length - offset
  const step = Math.min(index + 1 - offset, max)

  const percent = Math.max(minimum, (100 * step) / max)

  return {
    max,
    percent,
    step,
    maxRaw: slides.length,
  }
}
