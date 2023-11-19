import { ReactNode } from 'preact/compat'

import type { SlideProps, SlideType } from '../components/Slide'

export class SlideDecorator {
  slide: SlideType
  props: SlideProps

  constructor(slide: SlideType) {
    this.slide = slide
    this.props = slide?.props as SlideProps
  }

  get id() {
    return this.props.id
  }

  get index() {
    return this.props.index
  }

  canLeave() {
    if (this.props.canLeave === undefined) return true

    return this.props.canLeave()
  }

  beforeLeave() {
    if (this.props.beforeLeave === undefined) return true

    return this.props.beforeLeave()
  }

  afterLeave() {
    if (this.props.afterLeave === undefined) return true

    return this.props.afterLeave()
  }

  beforeShow() {
    if (this.props.beforeShow === undefined) return true

    return this.props.beforeShow()
  }

  afterShow() {
    if (this.props.afterShow === undefined) return true

    return this.props.afterShow()
  }

  render() {
    // return cloneElement(this.slide as unknown as VNode<HTMLDivElement>, { ref })

    return this.slide as unknown as ReactNode
    // return this.slide as unknown as VNode<HTMLDivElement>
  }
}
