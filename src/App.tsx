import { SliderTheme, SliderThemeProvider } from '@lib/next-slider-ui'

import { Slider1 } from './slider'
import './global.scss'

// TODO set this via config
const customSliderTheme: SliderTheme = {}

export function App() {
  return (
    <SliderThemeProvider theme={customSliderTheme}>
      <Slider1 />
    </SliderThemeProvider>
  )
}
