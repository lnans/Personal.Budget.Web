import { Icon } from '@iconify/react'
import { NotificationProps, notifications } from '@mantine/notifications'
import { DefaultMantineColor } from '@mantine/styles'

type NotificationPropsWrapped = Pick<NotificationProps, 'title' | 'message'>

const message = (notification: NotificationPropsWrapped, color?: DefaultMantineColor, icon?: string): NotificationProps => {
  return {
    title: notification.title,
    message: notification.message,
    color,
    ...(icon && { icon: <Icon icon={icon} /> }),
  }
}

export const notifySuccess = (notification: NotificationPropsWrapped) =>
  notifications.show(message(notification, 'green', 'material-symbols:check'))

export const notifyError = (notification: NotificationPropsWrapped) =>
  notifications.show(message(notification, 'red', 'material-symbols:close'))
