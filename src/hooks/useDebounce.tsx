import { useEffect, useState } from 'react'

export default function useDebounce(value: string, durationInMs = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, durationInMs)
    return () => {
      clearTimeout(handler)
    }
  }, [value, durationInMs])
  return debouncedValue
}
