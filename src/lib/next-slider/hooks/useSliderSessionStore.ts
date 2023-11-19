import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SliderSessionData<T extends Record<string, unknown>> = {
  session: T
  updateSession: (input: Partial<T>) => void
  resetSession: () => void
  deleteFromSession: (key: keyof T) => void
}

export function useSliderSessionStore<T extends Record<string, unknown>>(
  sliderId = 'all',
) {
  return create<SliderSessionData<T>>()(
    persist<SliderSessionData<T>>(
      (set, get) => ({
        session: {} as T,
        updateSession: (input: Partial<T>) => {
          set(state => {
            state = get()

            const sessionData = { ...state.session, ...input }

            console.log('updateSession', { ...state, session: sessionData })

            return { ...state, session: sessionData }
          })
        },
        resetSession: () => {
          set(state => ({ ...state, session: {} as T }))
        },
        deleteFromSession: (key: keyof T) => {
          set(state => {
            const data = state.session

            delete data[key]

            return { ...state, session: data }
          })
        },
      }),
      {
        name: `next-slider-session-storage-${sliderId}`,
      },
    ),
  )()
}
