import { useSliderIndexStore, useSliderSessionStore } from '@lib/next-slider'

export type SliderDataPayload = {
  email: string
  sliderUsage: string[]
}

export const useSessionStore = () => {
  return useSliderSessionStore<SliderDataPayload>('slider-1')
}

export const useIndexStore = () => {
  return useSliderIndexStore('slider-1')
}
