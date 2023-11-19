import create from 'zustand'

import {
  EventManager,
  Listener,
  eventManager,
  logger,
  SlideDecorator,
} from '../lib'
import { SlideType, SlideProps } from '../components/Slide'

export type DirectionType = 'forward' | 'backward' | 'stay' | 'initial'

export type SliderState = {
  index: number
  nextDirection: DirectionType
  last?: SlideDecorator
  current?: SlideDecorator
  upcoming?: SlideDecorator
  upcomingIndex?: number
  slides: SlideDecorator[]
  dispatchInitialGoTo: (start?: string | number) => void

  register: (slides: SlideType[]) => void
  unregister: (slides: SlideType[]) => void
  updateSlideProps: (id: string, props: SlideProps) => void

  goto: (index: number, skipValidation?: boolean) => Promise<boolean>
  gotoNext: (skipValidation?: boolean) => Promise<boolean>
  gotoPrev: (skipValidation?: boolean) => Promise<boolean>
  gotoId: (id: string, skipValidation?: boolean) => Promise<boolean>

  commitUpcoming: () => false | SliderState

  info: (...args: unknown[]) => void
  error: (...args: unknown[]) => void

  on: EventManager['on']
  trigger: EventManager['trigger']
  useOnResizeEvent: (callback: () => void) => void
  triggerResizeEvent: () => void
}

export const useSlider = create<SliderState>((set, get) => {
  return {
    index: 0,
    slides: [],
    current: undefined,
    nextDirection: 'initial',
    on: (name: string, callback: Listener['callback']) => {
      return eventManager.on(name, callback)
    },
    trigger: (...args: unknown[]) => {
      return eventManager.trigger(...args)
    },
    useOnResizeEvent: (callback: () => void) => {
      return eventManager.on('resize', callback)
    },
    triggerResizeEvent: () => {
      return eventManager.trigger('resize')
    },
    info: (...args: unknown[]) => {
      logger.info('SliderState ->', ...args)
    },
    error: (...args: unknown[]) => {
      logger.error('SliderState ->', ...args)
    },
    register: (slides: SlideType[]) => {
      const newSlides = slides.map((slide, index) => {
        if (slide.props) slide.props.index = index

        return new SlideDecorator(slide)
      })

      get().info(
        `registering slides: ${newSlides.map(slide => slide.id).join(', ')}`,
      )

      set(state => ({ ...state, slides: newSlides }))
    },
    unregister: (slides: SlideType[]) => {
      const slideIds = slides.map(slide => `${slide.props?.id}`)
      const state = get()
      const newSlides = state.slides.filter(
        slide => !slideIds.includes(`${slide.props?.id}`),
      )

      state.info(`removing slides: ${slideIds.join(', ')}`)

      // setting current to undefined as it will be called twice when rendered
      // in dev mode -> second time the validation would fail
      set(state => ({ ...state, slides: newSlides, current: undefined }))
    },
    dispatchInitialGoTo: (start?: string | number) => {
      const state = get()

      start === undefined
        ? state.goto(0)
        : typeof start === 'number'
        ? state.goto(start)
        : state
            .gotoId(start)
            .then(success => !success && state.goto(0))
            .catch(() => state.goto(0))
    },
    updateSlideProps: (id: string, props: SlideProps) => {
      // we need this to collect the final props that arrive on Slide.tsx
      const slide = get().slides.find(slide => slide.id == id)

      if (slide) slide.props = { ...slide.props, ...props }
    },
    goto: async (index, skipValidation = false) => {
      const state = get()

      if (state.current && state.index == index) {
        state.error(`not transitioning to: ${index} (same slide displayed)`)
        return false
      }

      if (index < 0 || index + 1 > state.slides.length) {
        state.error(`not transitioning to: ${index} (doesn't exist)`)
        return false
      }

      if (
        !skipValidation &&
        state.current &&
        !(await state.current.canLeave())
      ) {
        state.error(`not transitioning to: ${index} (pre condition)`)
        return false
      }

      let nextDirection: SliderState['nextDirection'] = 'initial'
      if (state.current != undefined) {
        nextDirection = (
          index > (state.current?.index ?? 0) ? 'forward' : 'backward'
        ) as DirectionType
      } else if (state.nextDirection != 'initial') {
        nextDirection = 'backward'
      }

      set(state => ({
        ...state,
        upcomingIndex: index,
        upcoming: state.slides[index],
        nextDirection,
      }))

      state.info(`preparing transition to: ${index}`)
      return true
    },
    commitUpcoming: () => {
      const state = get()
      const upcomingIndex = state.upcomingIndex
      if (!state.upcoming || upcomingIndex === undefined) return false

      state.info(`committing state to: ${upcomingIndex}`)
      const newState = {
        ...state,
        index: upcomingIndex,
        last: state.current,
        current: state.upcoming,
        upcoming: undefined,
        upcomingIndex: undefined,
      }

      set(newState)

      return newState
    },
    gotoNext: (skipValidation = false) => {
      const state = get()

      // state.trigger('navigation.next')
      return state.goto(state.index + 1, skipValidation)
    },
    gotoPrev: (skipValidation = false) => {
      const state = get()

      // state.trigger('navigation.prev')
      return state.goto(state.index - 1, skipValidation)
    },
    gotoId: (id: string, skipValidation = false) => {
      const state = get()
      const index = state.slides.findIndex(el => el.props?.id == id)

      if (index > -1) return state.goto(index, skipValidation)

      state.error(`can not go to slide id: ${id}`)

      return Promise.reject()
    },
  }
})
