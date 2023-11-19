import { Ref, createRef, useState } from 'preact/compat'

import { SlideDecorator } from '../lib/SlideDecorator'

export type DisplayStackItem = {
  slide: SlideDecorator
  nodeRef: Ref<HTMLDivElement>
}

export const useDisplayStack = () => {
  const [displayStack, setDisplayStack] = useState<DisplayStackItem[]>([])
  const pushDisplayItem = (slide: SlideDecorator) => {
    displayStack.push({
      slide,
      nodeRef: createRef(),
    })

    setDisplayStack(displayStack)
  }

  const shiftDisplayItem = () => {
    displayStack.shift()
    setDisplayStack(displayStack)
  }

  return {
    pushDisplayItem,
    shiftDisplayItem,
    displayStack,
  }
}
