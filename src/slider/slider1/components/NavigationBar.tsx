import { FC } from 'preact/compat'
import {
  NavigationBar as BaseNavigationBar,
  NavigationBarProps,
} from '@lib/next-slider-ui'

export const NavigationBar: FC<NavigationBarProps> = ({}) => {
  return (
    <BaseNavigationBar
      color='primary'
      className='slider-navigation-bar mt-8 relative'
    />
  )
}
