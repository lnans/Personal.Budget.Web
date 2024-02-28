import { create } from 'zustand'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

type Notification = {
  id: number
  message: string
  type: NotificationType
  isLeaving?: boolean
}

type NotificationState = {
  list: Notification[]
  autoClose: number | boolean
  setAutoClose: (autoClose: number | boolean) => void
  info: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
  remove: (id: number) => void
}

export const useNotificationsStore = create<NotificationState>()((set) => {
  const add = (message: string, type: NotificationType) => {
    return set((state) => {
      const id = Date.now()

      if (typeof state.autoClose === 'number') {
        setTimeout(() => {
          state.remove(id)
        }, state.autoClose)
      }

      return {
        list: [...state.list, { id, message, type }],
      }
    })
  }

  return {
    list: [],
    autoClose: 5000,
    setAutoClose: (autoClose) => set({ autoClose }),
    info: (message) => add(message, 'info'),
    success: (message) => add(message, 'success'),
    warning: (message) => add(message, 'warning'),
    error: (message) => add(message, 'error'),
    remove: (id) =>
      set((state) => {
        const notification = state.list.find((notification) => notification.id === id)
        if (notification && !notification.isLeaving) {
          notification.isLeaving = true
          setTimeout(() => {
            set((state) => ({ list: state.list.filter((notification) => notification.id !== id) }))
          }, 220)
        }

        return { list: state.list }
      }),
  }
})
