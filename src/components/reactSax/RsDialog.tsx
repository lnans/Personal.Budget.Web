import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
export interface RsDialogProps {
  show: boolean
  onClose?: () => void
  width?: string
  closable?: boolean
  children?: React.ReactNode
}

export default function RsDialog(props: RsDialogProps) {
  const { show, onClose, width, closable } = props
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

  return (
    <>
      {isDisplay && (
        <DialogBackDropStyled>
          <DialogContentStyled isLeaving={isLeaving} width={width}>
            {(closable === undefined || !!closable) && (
              <DialogCloseButtonStyled onClick={handleClose}>
                <DialogCloseIconButtonStyled></DialogCloseIconButtonStyled>
              </DialogCloseButtonStyled>
            )}
            {props.children}
          </DialogContentStyled>
        </DialogBackDropStyled>
      )}
    </>
  )
}

const DialogBackDropStyled = styled('div')`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(180%) blur(15px);
  z-index: 98000;
  align-items: center;
  justify-content: center;
`

const DialogContentStyled = styled('div')<{ isLeaving: boolean; width?: string }>`
  display: flex;
  background: #fff;
  min-width: ${(props) => (!!props.width ? props.width : '300px')};
  min-height: 150px;
  border-radius: 20px;
  animation: dialog 0.4s forwards;
  transform: scale(0.7);

  ${(props) =>
    props.isLeaving
      ? css`
          animation: dialog-leave 0.4s;
        `
      : ''}
`

const DialogCloseButtonStyled = styled('button')`
  position: absolute;
  top: -6px;
  right: -6px;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  background: inherit;
  border-radius: 12px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  z-index: 200;
  border: 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
    transform: translate(-2px, 2px);
  }
`

const DialogCloseIconButtonStyled = styled('i')`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  transition: all 0.25s ease;
  width: 34px;
  height: 34px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  &:before {
    width: 14px;
    height: 2px;
    background: black;
    content: '';
    position: absolute;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform: rotate(-45deg);
  }
  &:after {
    width: 14px;
    height: 2px;
    background: black;
    content: '';
    position: absolute;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform: rotate(45deg);
  }
`
