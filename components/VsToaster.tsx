import { EventEmitter } from 'events'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/modules/colors.module.scss'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

declare interface ToastAlertReceiver {
  on(event: string, listener: (type: ToastType, title: string, message: string) => void): this
}

class ToastAlertReceiver extends EventEmitter {
  constructor() {
    super()
    this.setMaxListeners(1)
  }
}
const toastAlertReceiver = new ToastAlertReceiver() // Unique instance

class ToastAlertService {
  private toast(type: ToastType, title: string, message: string): void {
    toastAlertReceiver.emit('toast', type, title, message)
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
const toastAlertService = new ToastAlertService() // Unique instance

export { toastAlertService }

interface ToastState {
  isVisible: boolean
  title?: string
  message?: string
  type: ToastType
}
export default function VsToaster() {
  const [toast, setToast] = useState<ToastState>({ type: 'info', isVisible: false })
  const [isLeave, setIsLeave] = useState<boolean>(false)
  const [autoTimeout, setAutoTimeout] = useState<NodeJS.Timeout>()

  const onCloseHandler = () => {
    clearTimeout(autoTimeout!)
    if (isLeave) return
    setIsLeave(true)
    setTimeout(() => {
      setToast({ ...toast, isVisible: false })
      setIsLeave(false)
    }, 600)
  }

  const displayToast = (type: ToastType, title: string, message: string) => {
    clearTimeout(autoTimeout!)
    const alertType = type
    setToast({ type: alertType, title, message, isVisible: true })
    setAutoTimeout(setTimeout(onCloseHandler, 3000))
  }

  useEffect(() => {
    toastAlertReceiver.on('toast', displayToast)
    return () => {
      toastAlertReceiver.off('toast', displayToast)
    }
  }, [])

  let icon = ''
  switch (toast.type) {
    case 'info':
      icon = 'bx-info-circle'
      break
    case 'success':
      icon = 'bx-check-circle'
      break
    case 'warning':
      icon = 'bx-error'
      break
    case 'error':
      icon = 'bx-error-alt'
      break
    default:
      break
  }

  const styles = {
    bgColor: `rgba(${colors[toast.type]}, .15)`,
    textColor: `rgba(${colors[toast.type]}, 1)`,
  }

  return (
    <ToasterContainerStyled>
      {toast.isVisible && (
        <ToastStyled bgColor={styles.bgColor} textColor={styles.textColor} className={isLeave ? 'leave-state' : ''}>
          <ToastMessageContainerStyled>
            <i className={`bx ${icon}`}></i>
            <ToastMessageContentStyled>
              <ToastMessageHeader>
                <h4>{toast.title}</h4>
              </ToastMessageHeader>
              <ToastMessageStyled>{toast.message}</ToastMessageStyled>
            </ToastMessageContentStyled>
          </ToastMessageContainerStyled>
          <ToastCloseButtonStyled onClick={onCloseHandler}>
            <ToastCloseIconStyled textColor={styles.textColor}></ToastCloseIconStyled>
          </ToastCloseButtonStyled>
        </ToastStyled>
      )}
    </ToasterContainerStyled>
  )
}

const ToasterContainerStyled = styled('div')`
  position: fixed;
  width: 100vw;
  pointer-events: none;
  transition: all 0.25s ease;
  bottom: 0;
  z-index: 99000;
`

const ToastStyled = styled('div')<{ bgColor: string; textColor: string }>`
  position: relative;
  bottom: 0;
  margin-bottom: 12px;
  pointer-events: all;
  width: fit-content;
  min-width: 250px;
  max-width: 360px;
  min-height: 70px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  margin-inline: auto;
  border-radius: 20px;
  transition: all 0.25s ease;
  opacity: 1;
  animation: notification 0.5s ease forwards;
  display: flex;
  flex-direction: column;
  padding: 20px;

  &.leave-state {
    transform: translateY(125%);
    animation: notification-leave 0.25s ease forwards;
    transition: all 0.25s ease;
  }
`
const ToastMessageContainerStyled = styled('div')`
  display: flex;
  align-items: center;

  i {
    left: -7px;
    padding-right: 7px;
    font-size: 1.1rem;
  }
`

const ToastMessageContentStyled = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 7px;
`

const ToastMessageHeader = styled('header')`
  width: 100%;
  margin: 0;
  padding: 0 0 6px;
  font-size: 0.9rem;
  font-weight: 600;
`

const ToastMessageStyled = styled('p')`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;
`

const ToastCloseButtonStyled = styled('button')`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 0;
  transform: scale(0.75);
  background: transparent;
  border: 0;
  cursor: pointer;
`

const ToastCloseIconStyled = styled('i')<{ textColor: string }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.25s ease;

  &:before {
    background: ${(props) => props.textColor};
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform: rotate(-45deg);
  }

  &:hover:before {
    width: 12px;
    transform: rotate(180deg);
  }

  &:after {
    background: ${(props) => props.textColor};
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform: rotate(45deg);
  }

  &:hover:after {
    width: 12px;
    transform: rotate(180deg);
  }
`
