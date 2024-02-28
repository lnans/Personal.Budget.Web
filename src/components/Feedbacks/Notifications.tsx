import {
  IconAlertSquareRounded,
  IconInfoSquareRounded,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconX,
} from '@tabler/icons-react'
import { useEffect } from 'react'

import { cn } from '@/lib/tailwind-merge'
import { NotificationType, useNotificationsStore } from '@/stores'

type NotificationProviderProps = {
  autoClose?: number | boolean
}

function Notifications({ autoClose = 5000 }: NotificationProviderProps) {
  const { list: notifications, remove, setAutoClose } = useNotificationsStore()

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

export default Notifications
