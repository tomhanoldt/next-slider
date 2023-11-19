import { FC, PropsWithChildren } from 'preact/compat'
import { Flowbite, CustomFlowbiteTheme } from 'flowbite-react'
import { mergeDeep } from 'flowbite-react/lib/esm/helpers/merge-deep'

export type SliderTheme = CustomFlowbiteTheme

export type SliderThemeProps = PropsWithChildren & {
  theme?: SliderTheme
}

const sliderTheme: SliderTheme = {
  progress: {
    color: {
      primary: 'bg-blue-800',
    },
  },
  button: {
    color: {
      primary: 'bg-blue-800 text-white',
      white: 'text-blue-800 border border-blue-800',
    },
  },
}

export const SliderThemeProvider: FC<SliderThemeProps> = ({
  theme,
  children,
}) => {
  return (
    <Flowbite theme={{ theme: mergeDeep(sliderTheme, theme || {}) }}>
      {children}
    </Flowbite>
  )
}
