import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import './Dialog.scss'

export interface DialogProps {
  show: boolean
  title?: string
  onClose?: () => void
  width?: string
  closable?: boolean
  children?: ReactNode
}

export default function Dialog(props: DialogProps) {
  const { show, title, onClose, width, closable } = props
  const [isDisplay, setIsDisplay] = useState(show)
  const [isLeaving, setIsLeaving] = useState(false)

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsDisplay(false)
      setIsLeaving(false)
      onClose && onClose()
    }, 100)
  }

  useEffect(() => {
    setIsDisplay(show)
  }, [show])

  const dialogClasses = clsx({
    dialog: true,
    'is-leaving': isLeaving,
  })

  return (
    <>
      {isDisplay && (
        <div className="dialog-backdrop">
          <div className={dialogClasses} style={{ minWidth: width ?? '300px' }} data-testid="dialog">
            {(closable === undefined || !!closable) && (
              <button className="dialog-button" onClick={handleClose} data-testid="dialog-button">
                <i className="dialog-button-icon" />
              </button>
            )}
            {!!title && <header className="dialog-title">{title}</header>}
            {props.children}
          </div>
        </div>
      )}
    </>
  )
}
