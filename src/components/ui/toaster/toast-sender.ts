import { toastReceiver } from './toast-receiver'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastMessage {
  id: string
  title: string
  message: string
  type: ToastType
}

class ToastAlertService {
  private toast(type: ToastType, title: string, message: string): void {
    toastReceiver.emit('toast', { id: crypto.randomUUID(), type, title, message })
  }

  success(title: string, message: string): void {
    this.toast('success', title, message)
  }

  info(title: string, message: string): void {
    this.toast('info', title, message)
  }

  warning(title: string, message: string): void {
    this.toast('warning', title, message)
  }

  error(title: string, message: string): void {
    this.toast('error', title, message)
  }
}
const toastSender = new ToastAlertService() // Unique instance

export { toastSender }
