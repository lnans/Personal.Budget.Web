import { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/modules/colors.module.scss'

export type VsButtonColor = 'primary' | 'success' | 'error' | 'default'
export interface VsButtonProps {
  children?: React.ReactNode
  color?: VsButtonColor
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  style?: CSSProperties
  onClick?: () => void
}

export default function VsButton(props: VsButtonProps) {
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 300)
    } else setIsRippling(false)
  }, [coords])

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const styles = {
    disabled: !!props.disabled,
    loading: !!props.loading,
    fullWidth: !!props.fullWidth,
    bgColor: `rgba(${colors[props.color ?? 'default']}, 1)`,
    loaderBgColor: `rgba(${colors[props.color ?? 'default']}, 0.8)`,
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    props.onClick && props.onClick()
  }

  return (
    <ButtonContainerStyled fullWidth={styles.fullWidth} style={props.style}>
      <ButtonStyled
        fullWidth={styles.fullWidth}
        disabled={styles.disabled}
        bgColor={styles.bgColor}
        isLoading={styles.loading}
        onClick={handleClick}
      >
        {isRippling ? (
          <span
            className="ripple"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          />
        ) : (
          ''
        )}
        <ButtonContentStyled>{props.children}</ButtonContentStyled>
        {props.loading && <ButtonLoaderStyled bgColor={styles.loaderBgColor} />}
      </ButtonStyled>
    </ButtonContainerStyled>
  )
}

const ButtonContainerStyled = styled('div')<{ fullWidth: boolean }>`
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  margin: ${(props) => (props.fullWidth ? '0' : '5px')};
`

const ButtonStyled = styled('button')<{ fullWidth: boolean; bgColor: string; isLoading: boolean }>`
  border-radius: 12px;
  border: 0;
  position: relative;
  user-select: none;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 0.8rem;
  color: #fff;
  cursor: pointer;
  height: 38px;
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'all')};
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  background-color: ${(props) => props.bgColor};

  &:disabled {
    pointer-events: none;
    opacity: 0.35;
  }
`

const ButtonContentStyled = styled('div')`
  padding: 8px 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`

const ButtonLoaderStyled = styled('div')<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bgColor};
  border-radius: inherit;
  z-index: 4;
  &:before {
    content: '';
    width: 17px;
    height: 17px;
    position: absolute;
    border: 2px solid hsla(0, 0%, 100%, 0);
    border-left-color: #fff;
    border-radius: 50%;
    animation: loader 0.6s ease infinite;
  }
  &:after {
    content: '';
    width: 17px;
    height: 17px;
    position: absolute;
    border: 2px solid hsla(0, 0%, 100%, 0);
    border-left: 2px dotted hsla(0, 0%, 100%, 0.6);
    border-radius: 50%;
    animation: loader 0.6s linear infinite;
  }
`
