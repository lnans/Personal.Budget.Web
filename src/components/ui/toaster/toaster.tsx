import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { toastReceiver } from './ToastReceiver'
import { ToastMessage } from './ToastSender'
import './Toaster.scss'

export default function Toaster() {
  const [toastList, setToastList] = useState<ToastMessage[]>([])

  const onNewToast = (toast: ToastMessage) => setToastList((toasts) => [...toasts, toast])
  const onCloseToast = (id: string) => setToastList((values) => values.filter((t) => t.id !== id))

  useEffect(() => {
    toastReceiver.on('toast', onNewToast)
    return () => {
      toastReceiver.off('toast', onNewToast)
    }
  }, [])

  return (
    <div className="toast-container" data-testid="toast-container">
      {toastList.map((toast) => (
        <Toast key={toast.id} toast={toast} duration={3000} onClose={onCloseToast} />
      ))}
    </div>
  )
}

interface ToastProps {
  toast: ToastMessage
  duration: number
  onClose: (id: string) => void
}

function Toast(props: ToastProps) {
  const { toast, duration, onClose } = props
  const [isLeaving, setIsLeaving] = useState(false)

  let durationTimer: NodeJS.Timeout
  let leaveTimer: NodeJS.Timeout

  const handleClose = () => {
    clearTimeout(leaveTimer)
    clearTimeout(durationTimer)
    setIsLeaving(true)
    leaveTimer = setTimeout(() => {
      onClose(toast.id)
    }, 300)
  }

  useEffect(() => {
    durationTimer = setTimeout(() => {
      setIsLeaving(true)
      leaveTimer = setTimeout(() => {
        onClose(toast.id)
      }, 300)
    }, duration)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(durationTimer)
    }
  }, [])

  const toastClasses = clsx({
    toast: true,
    'is-leaving': isLeaving,
    'toast--primary': toast.type === 'info',
    'toast--success': toast.type === 'success',
    'toast--warning': toast.type === 'warning',
    'toast--error': toast.type === 'error',
  })

  const iconClasses = clsx({
    bx: true,
    'bx-info-circle': toast.type === 'info',
    'bx-check-circle': toast.type === 'success',
    'bx-error': toast.type === 'warning',
    'bx-error-alt': toast.type === 'error',
  })

  return (
    <div className={toastClasses} data-testid="toast">
      <div className="toast-message-container">
        <i className={iconClasses}></i>
        <div className="toast-message-content">
          <header className="toast-message-header">
            <h4>{toast.title}</h4>
          </header>
          <p className="toast-message">{toast.message}</p>
        </div>
      </div>
      <button className="toast-close-button" onClick={handleClose} data-testid="toast-close-button">
        <i className="toast-close-icon"></i>
      </button>
    </div>
  )
}
