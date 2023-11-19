import { useEffect } from 'preact/hooks'

export function useWindowResize(callback: () => void) {
  useEffect(() => {
    window.addEventListener('resize', callback)

    return () => {
      window.removeEventListener('resize', callback)
    }
  })
}
