/* eslint-disable react-refresh/only-export-components */
import {
  IconAlertSquareRounded,
  IconInfoSquareRounded,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconX,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { create } from 'zustand'

import { cn } from '@/lib/tailwind-merge'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

type Notification = {
  id: number
  message: string
  type: NotificationType
  isLeaving?: boolean
}

type NotificationState = {
  notifications: Notification[]
  autoClose: number | boolean
  setAutoClose: (autoClose: number | boolean) => void
  info: (message: string) => void
  success: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
  remove: (id: number) => void
}

const notificationStore = create<NotificationState>()((set) => {
  const add = (message: string, type: NotificationType) => {
    return set((state) => {
      const id = Date.now()

      if (typeof state.autoClose === 'number') {
        setTimeout(() => {
          state.remove(id)
        }, state.autoClose)
      }

      return {
        notifications: [...state.notifications, { id, message, type }],
      }
    })
  }

  return {
    notifications: [],
    autoClose: 5000,
    setAutoClose: (autoClose) => set({ autoClose }),
    info: (message) => add(message, 'info'),
    success: (message) => add(message, 'success'),
    warning: (message) => add(message, 'warning'),
    error: (message) => add(message, 'error'),
    remove: (id) =>
      set((state) => {
        const notification = state.notifications.find((notification) => notification.id === id)
        if (notification && !notification.isLeaving) {
          notification.isLeaving = true
          setTimeout(() => {
            set((state) => ({ notifications: state.notifications.filter((notification) => notification.id !== id) }))
          }, 220)
        }

        return { notifications: state.notifications }
      }),
  }
})

type NotificationProviderProps = {
  autoClose?: number | boolean
}

export function Notifications({ autoClose = 5000 }: NotificationProviderProps) {
  const { notifications, remove, setAutoClose } = notificationStore()

  useEffect(() => {
    setAutoClose(autoClose)
  }, [setAutoClose, autoClose])

  const getIcon = (type: NotificationType) => {
    const size = 28
    switch (type) {
      case 'success':
        return <IconSquareRoundedCheck className="text-green-400" size={size} />
      case 'error':
        return <IconSquareRoundedX className="text-red-400" size={size} />
      case 'warning':
        return <IconAlertSquareRounded className="text-yellow-400" size={size} />
      case 'info':
        return <IconInfoSquareRounded className="text-blue-400" size={size} />
    }
  }

  return (
    <div className="fixed right-0 bottom-0 z-[1000] w-96 flex flex-col gap-4 items-center justify-end m-4 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            { 'animate-notificationLeave': notification.isLeaving },
            'relative flex gap-4 p-4 pointer-events-auto w-full max-w-96 shadow-md shadow-slate-100 border-solid border-gray-200 border-[1px] rounded-lg animate-notificationEnter'
          )}
        >
          {getIcon(notification.type)}
          <p className="w-full leading-7 text-sm text-gray-900">{notification.message}</p>
          <IconX
            className="text-gray-400 cursor-pointer hover:text-gray-500 transition-colors duration-300"
            size={28}
            onClick={() => remove(notification.id)}
          />
        </div>
      ))}
    </div>
  )
}

export function useNotifications() {
  const { info, success, warning, error } = notificationStore()
  return { info, success, warning, error }
}
