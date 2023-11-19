import {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'preact/compat'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TransitionGroup } from 'react-transition-group'

import { logger, SlideDecorator } from './lib'
import { useSlider } from './hooks'
import { SliderWrapper, SlideType } from './components'
import { CSSTransitionLeftRight } from './animations'
import { useDisplayStack } from './hooks/useDisplayStack'
import { useWindowResize } from './hooks/useWindowResize'

export type SliderControllerProps = PropsWithChildren & {
  onReady?: () => void
  onInit?: () => void
  onUnmount?: () => void
  onShowSlide?: (slide: SlideDecorator, index: number) => void
  initialSlide?: number | string
  animationDurationMs?: number
  initialAnimationDurationMs?: number
  minHeight?: number
  zIndex?: number
}

export const SliderController: FC<SliderControllerProps> = ({
  children,
  onInit,
  onReady,
  onUnmount,
  onShowSlide,
  initialSlide: start = 0,
  animationDurationMs = 800,
  initialAnimationDurationMs = 300,
  minHeight = 200,
  zIndex = 1,
}) => {
  if (!Array.isArray(children)) children = [children]

  const {
    nextDirection,
    current,
    upcoming,
    commitUpcoming,
    register,
    unregister,
    dispatchInitialGoTo,
    trigger,
    useOnResizeEvent: useResizeEvent,
  } = useSlider()

  const { pushDisplayItem, shiftDisplayItem, displayStack } = useDisplayStack()

  const sliderWrapperRef = useRef<HTMLDivElement>(null)

  const [sliderHeight, setSLiderHeight] = useState(0)
  const [loading, setLoading] = useState(true)

  useResizeEvent(() => updateSliderHeight())
  useWindowResize(() => updateSliderHeight())

  // register slides
  useEffect(() => {
    if (!children) return

    onInit?.()
    logger.info('SliderController ->', 'onInit')

    const childrenArray = (children as []).map(
      child => child as unknown as SlideType,
    )

    // register slides
    register(childrenArray)

    // goto initial slide
    dispatchInitialGoTo(start)

    // attention: we get called twice in development mode, so we have to unregister
    return () => {
      onUnmount?.()
      logger.info('SliderController ->', 'onUnmount')

      unregister(childrenArray)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  // transition between two slides
  useEffect(() => {
    if (!upcoming) return

    pushDisplayItem(upcoming)

    // TODO chain of promises
    current?.beforeLeave()
    upcoming?.beforeShow()

    const newState = commitUpcoming()
    if (newState === false) {
      logger.info('SliderController ->', `commitUpcoming: commit was aborted`)
      return
    }

    if (displayStack.length > 1) shiftDisplayItem()

    // TODO trigger onn ready and onShow when transition is finished
    setTimeout(
      () => {
        if (loading) {
          setLoading(false)
          onReady?.()
          logger.info('SliderController ->', 'onReady')
        }

        if (newState.current) {
          onShowSlide?.(newState.current, newState.index)
          logger.info('SliderController ->', `onShowSlide: ${upcoming.id}`)
        }
      },
      (loading ? initialAnimationDurationMs : animationDurationMs) + 10,
    )

    current?.afterLeave()
    upcoming?.afterShow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcoming])

  const calculateSliderHeight = () => {
    const current = displayStack[0]?.nodeRef.current
    const upcoming = displayStack[1]?.nodeRef.current

    return (
      (current == undefined
        ? upcoming?.offsetHeight
        : upcoming == undefined
        ? current.offsetHeight
        : upcoming.offsetHeight) || 0
    )
  }

  const updateSliderHeight = () => {
    const newHeight = calculateSliderHeight()

    if (newHeight > 0 && newHeight !== sliderHeight) {
      setSLiderHeight(newHeight)
      trigger('resized')
    }
  }

  // detect new slide height
  useEffect(() => {
    updateSliderHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    displayStack[0]?.nodeRef?.current?.offsetHeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    displayStack[1]?.nodeRef?.current?.offsetHeight,
  ])

  return (
    <SliderWrapper
      ref={sliderWrapperRef}
      loading={loading}
      minHeight={minHeight}
      heightAnimationDurationMs={400}
      style={{ height: `${sliderHeight}px`, zIndex }}
    >
      <TransitionGroup id='slider-animation-display' component={null}>
        {/* animate transition between 2 slides  */}
        {displayStack.map(slide => (
          <CSSTransitionLeftRight
            key={slide.slide.props?.id}
            nodeRef={slide.nodeRef}
            timeout={animationDurationMs}
            animationDurationMs={animationDurationMs}
            classNames={nextDirection}
          >
            <div ref={slide.nodeRef}>{slide.slide.render()}</div>
          </CSSTransitionLeftRight>
        ))}
      </TransitionGroup>
      {updateSliderHeight()}
    </SliderWrapper>
  )
}
