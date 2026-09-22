import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      localStorage.removeItem("expense-manager-expenses");
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  function updateValue(nextValue) {
    const resolved = typeof nextValue === 'function' ? nextValue(value) : nextValue
    setValue(resolved)
    localStorage.setItem(key, JSON.stringify(resolved))
  }

  return [value, updateValue]
}
