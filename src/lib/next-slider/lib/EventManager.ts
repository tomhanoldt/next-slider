import { Logger, logger } from './Logger'

export type Event = {
  type: string
  tags: string[]
  canceled: boolean
}

export type Listener = {
  name: string
  context?: string
  callback: (event: Event, ...args: unknown[]) => void
  tags: string[]
}

// https://github.com/slidevision/sl8v-slider-api/blob/master/docs/API.md
export class EventManager {
  logger: Logger
  listener: Record<string, Array<Listener>> = {}

  constructor(logger: Logger) {
    this.logger = logger
    this.trigger.bind(this)
    this.on.bind(this)
  }

  trigger(...args: unknown[]) {
    const data = [...args]
    let name = `${data.shift()}`

    this.logger.info(`triggerEvent(${name})`)
    this.logger.debug(`trigger(${name})`, data)

    const tags = name.split('.')
    name = `${tags.shift()}`

    const event: Event = { type: name, tags, canceled: false }

    if (!this.listener[name]) return event

    this.listener[name].forEach(listener => {
      if (!listener.tags || this.allTagsInArray(listener.tags, tags))
        listener.callback(event, ...data)
    })

    return event
  }

  on(name: string, callback: Listener['callback']) {
    const tags = name.split('.')
    name = `${tags.shift()}`
    const context = tags.pop()

    if (!this.listener[name]) this.listener[name] = []

    this.listener[name].push({ name, tags, context, callback })
  }

  off(name: string) {
    const tags = name.split('.')
    name = `${tags.shift()}`
    const context = tags.pop()

    if (!this.listener[name]) return

    this.listener[name] = this.listener[name].filter(listener => {
      if (listener.context !== context) return true
      if (!this.allTagsInArray(tags, listener.tags)) return false
    })
  }

  allTagsInArray(tags: string[], inputArray: string[]) {
    for (const tag of tags) {
      if (!inputArray.includes(tag)) return false
    }

    return true
  }

  isCanceled(event: Event) {
    return event.canceled === true
  }

  cancel(event: Event) {
    event.canceled = true
    return false
  }
}

export const eventManager = new EventManager(logger)
