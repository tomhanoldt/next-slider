export const humanizeKey = (input: string): string => {
  return input
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ')
}

export const validateEmail = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}

export const isBrowser = () => typeof window !== 'undefined'

export const dumpObject = (object: object) => {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ')
}
