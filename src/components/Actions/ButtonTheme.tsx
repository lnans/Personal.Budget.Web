/* eslint-disable react-refresh/only-export-components */
import { IconMoon, IconSun } from '@tabler/icons-react'
import { create } from 'zustand'

import { ButtonIcon } from '@/components/Actions'
import { storage } from '@/utils/storage'

type Theme = 'light' | 'dark'
type ThemeState = {
  theme: Theme
  toggleTheme: () => void
}

function initTheme() {
  if (
    storage.getTheme() === 'dark' ||
    (storage.getTheme() === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
    storage.setTheme('dark')
    return 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    storage.setTheme('light')
    return 'light'
  }
}

export const useTheme = create<ThemeState>((set) => ({
  theme: initTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark')
      storage.setTheme(newTheme)
      return { theme: newTheme }
    }),
}))

function ButtonTheme() {
  const { theme, toggleTheme } = useTheme()
  return <ButtonIcon icon={theme === 'light' ? <IconMoon /> : <IconSun />} onClick={toggleTheme} />
}

export default ButtonTheme
