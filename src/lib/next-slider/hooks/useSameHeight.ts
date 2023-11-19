import { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'

import { useWindowResize } from './useWindowResize'

export function useSameHeight<T extends HTMLElement>(refs: RefObject<T>[]) {
  const resetHeight = () => {
    refs.forEach(ref => {
      if (ref.current) ref.current.style.height = 'auto'
    })
  }

  const calculateMaxHeight = () => {
    let maxHeight = 0

    refs.forEach(ref => {
      if (ref.current) maxHeight = Math.max(maxHeight, ref.current.offsetHeight)
    })

    return maxHeight
  }

  const applyHeight = (maxHeight: number) => {
    refs.forEach(ref => {
      if (ref.current) ref.current.style.height = `${maxHeight}px`
    })
  }

  const populateSameHeight = () => {
    resetHeight()

    const maxHeight = calculateMaxHeight()

    if (maxHeight > 0) applyHeight(maxHeight)
  }

  useWindowResize(populateSameHeight)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => populateSameHeight(), [refs])

  return { populateSameHeight }
}
