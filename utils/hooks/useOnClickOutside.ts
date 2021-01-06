import { useEffect } from 'react'

export default function useOnClickOutside(ref: { current: HTMLElement }, handler: (event: Event) => void) {
  useEffect(
    () => {
      const listener = (event: Event): void => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    [ref, handler]
  )
}
