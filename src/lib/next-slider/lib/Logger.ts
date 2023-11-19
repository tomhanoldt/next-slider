export class Logger {
  namespace: string
  debugMode: boolean

  constructor(namespace: string, debugMode = true) {
    this.namespace = namespace
    this.debugMode = debugMode
  }

  console() {
    if (!window || !('console' in window)) return

    return window.console
  }

  info(...args: unknown[]): void {
    args[0] = `${this.namespace}::${args[0]}`

    this.console()?.info(...args)
  }

  debug(...args: unknown[]): void {
    args[0] = `${this.namespace}::${args[0]}`

    if (this.debugMode) this.console()?.debug(...args)
  }

  warn(...args: unknown[]): void {
    args[0] = `${this.namespace}::${args[0]}`

    if (this.debugMode) this.console()?.warn(...args)
  }

  error(...args: unknown[]): void {
    args[0] = `${this.namespace}::${args[0]}`

    this.console()?.error(...args)
  }
}

export const logger = new Logger('NextSlider')
