export class Locking {
  locked: boolean

  constructor(initial = true) {
    this.locked = initial
  }

  lock() {
    this.locked = true
  }

  unlock() {
    this.locked = false
  }
}
