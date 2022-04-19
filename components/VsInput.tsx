import React, { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import colors from '../styles/modules/colors.module.scss'

export interface VsInputProps {
  label: string
  value: string
  message?: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: string
  type?: HTMLInputTypeAttribute
  onChange?: (value: string) => void
  onEnterKey?: () => void
}

export default function VsInput(props: VsInputProps) {
  const { label, message, loading, disabled, icon, type, fullWidth, onChange, onEnterKey } = props
  const [value, setValue] = useState(props.value ?? '')

  const ref = useRef<HTMLInputElement>(null)

  const styles = {
    textColor: `rgba(${colors.black}, 1)`,
    loaderColor: `rgba(${colors.primary}, 1)`,
    messageColor: `rgba(${colors.error}, 1)`,
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterKey && onEnterKey()
    }
  }

  useEffect(() => {
    if ((disabled || loading) && ref?.current) {
      ref.current.blur()
    }
  }, [disabled, loading])

  return (
    <InputParentStyled fullWidth={!!fullWidth}>
      <InputContentStyled isDisabled={!!loading || !!disabled}>
        <InputStyled
          ref={ref}
          textColor={styles.textColor}
          value={value ?? ''}
          onChange={handleChange}
          onKeyUp={handleEnterKey}
          tabIndex={loading || disabled ? -1 : undefined}
          hasIcon={!!icon}
          type={!!type ? type : 'text'}
        />
        <InputLabelStyled hasValue={!!value}>{label}</InputLabelStyled>
        {loading && <InputLoaderStyled loaderColor={styles.loaderColor} />}
        {message && <InputMessageStyled textColor={styles.messageColor}>{message}</InputMessageStyled>}
        {!!icon && !loading && (
          <InputIconStyled textColor={styles.textColor} isDisabled={!!disabled}>
            <i className={`bx ${icon}`} />
          </InputIconStyled>
        )}
      </InputContentStyled>
    </InputParentStyled>
  )
}

const InputParentStyled = styled('div')<{ fullWidth: boolean }>`
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 26px 5px 5px 5px;
  width: 100%;
  min-width: 150px;
  max-width: ${(props) => (props.fullWidth ? 'none' : '200px')};
`

const InputContentStyled = styled('div')<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 12px;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};
  user-select: ${(props) => (props.isDisabled ? 'none' : 'all')};
  & input {
    opacity: ${(props) => (props.isDisabled ? '.6' : '1')};
  }
`

const InputStyled = styled('input')<{ textColor: string; hasIcon: boolean }>`
  border: 2px solid transparent;
  background: ${() => `rgba(${colors.gray2}, 1)`};
  color: ${(props) => props.textColor};
  border-radius: inherit;
  padding: 7px 13px 7px 10px;
  width: 100%;
  outline: none;
  padding-right: ${(props) => (props.hasIcon ? '38px' : '0')};

  &:focus + label {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate(-3%, -77%);
    font-size: 0.75rem;
  }

  &:focus ~ span {
    box-shadow: -15px 10px 10px -10px rgba(0, 0, 0, 0.05);
    transform: translate(6px, -6px);
    background: ${() => `rgba(${colors.gray1}, 1)`};
  }
`

const InputLabelStyled = styled('label')<{ hasValue: boolean }>`
  position: absolute;
  left: 13px;
  font-size: 0.8rem;
  cursor: text;
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.4;

  ${(props) =>
    props.hasValue
      ? css`
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-3px, -80%);
          font-size: 0.75rem;
        `
      : ''}
`

const InputLoaderStyled = styled('div')<{ loaderColor: string }>`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 7px;
  pointer-events: none;
  border-radius: 50%;
  box-sizing: border-box;
  background: inherit;
  cursor: default;
  z-index: 4;

  &:before {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    content: '';
    border: ${(props) => `2px dashed ${props.loaderColor}`};
    border-radius: inherit;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: loader 0.6s linear infinite;
    opacity: 0.2;
  }

  &:after {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    content: '';
    border: ${(props) => `2px solid ${props.loaderColor}`};
    border-radius: inherit;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: loader 0.6s ease infinite;
  }
`

const InputMessageStyled = styled('label')<{ textColor: string }>`
  position: absolute;
  right: 0;
  padding-right: 12px;
  font-size: 0.7rem;
  pointer-events: none;
  color: ${(props) => props.textColor};
  bottom: -20px;
`

const InputIconStyled = styled('span')<{ textColor: string; isDisabled: boolean }>`
  left: auto;
  right: 0;
  box-shadow: -12px 0 10px -10px rgba(0, 0, 0, 0.05);
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  background: ${() => `rgba(${colors.gray2}, 1)`};
  pointer-events: none;
  color: ${(props) => props.textColor};
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
`
