import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import colors from '../../styles/_colors.module.scss'

export type RsSelectItem = {
  [key in string]: string
}

export interface RsSelectProps {
  label: string
  itemKey: string
  itemValue: string
  items: RsSelectItem[]
  loading?: boolean
  disabled?: boolean
  message?: string
  onChange?: (id: string) => void
}

export default function RsSelect(props: RsSelectProps) {
  const { label, items, itemKey, itemValue, onChange, loading, disabled, message } = props
  const [isActive, setIsActive] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>()
  const [selectedLabel, setLabelValue] = useState<string>()

  const handleOnBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.relatedTarget?.id.startsWith('selectItem_')) {
      setIsActive(false)
    }
  }

  const handleOnSelect = (item: RsSelectItem) => {
    setSelectedValue(item[itemKey])
    setLabelValue(item[itemValue])
    setIsActive(false)
    onChange && onChange(item[itemKey])
  }

  const styles = {
    bgColor: `rgba(${colors.gray2}, 1)`,
    textColor: `rgba(${colors.black}, 1)`,
    itemSelectedBgColor: `rgba(${colors.primary}, .05)`,
    itemSelectedTextColor: `rgba(${colors.primary}, 1)`,
    loaderColor: `rgba(${colors.primary}, 1)`,
    messageColor: `rgba(${colors.error}, 1)`,
  }
  return (
    <SelectContentSlyled>
      <SelectStyled isDisabled={!!loading || !!disabled}>
        <InputStyled
          onFocus={() => setIsActive(true)}
          onBlur={handleOnBlur}
          readOnly
          bgColor={styles.bgColor}
          textColor={styles.textColor}
          isActive={isActive}
          value={selectedLabel ?? ''}
          tabIndex={loading || disabled ? -1 : undefined}
        />

        <SelectPlaceHolderStyled hasValue={!!selectedLabel || isActive}>{label}</SelectPlaceHolderStyled>

        {!loading && <SelectIconStyled textColor={styles.textColor} isActive={isActive} isDisabled={!!disabled} />}
        {loading && <SelectLoaderStyled loaderColor={styles.loaderColor} />}
        {message && <SelectMessageStyled textColor={styles.messageColor}>{message}</SelectMessageStyled>}

        {isActive && (
          <SelectListStyled bgColor={styles.bgColor}>
            {items.map((item) => (
              <Fragment key={item[itemKey]}>
                {item.id === selectedValue ? (
                  <SelectListItemSelectedStyled
                    id={`selectItem_${item[itemKey]}`}
                    bgColor={styles.itemSelectedBgColor}
                    textColor={styles.itemSelectedTextColor}
                  >
                    {item[itemValue]}
                  </SelectListItemSelectedStyled>
                ) : (
                  <SelectListItemStyled
                    id={`selectItem_${item[itemKey]}`}
                    textColor={styles.textColor}
                    hoverTextColor={styles.itemSelectedTextColor}
                    onClick={() => handleOnSelect(item)}
                  >
                    {item[itemValue]}
                  </SelectListItemStyled>
                )}
              </Fragment>
            ))}
          </SelectListStyled>
        )}
      </SelectStyled>
    </SelectContentSlyled>
  )
}

const SelectContentSlyled = styled('div')`
  width: 100%;
  min-width: 150px;
  max-width: 200px;
  margin: 26px 5px 5px 5px;
  display: flex;
`

const SelectStyled = styled('div')<{ isDisabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  width: 100%;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};
  user-select: ${(props) => (props.isDisabled ? 'none' : 'all')};
  & input {
    opacity: ${(props) => (props.isDisabled ? '.6' : '1')};
  }
`

const InputStyled = styled('input')<{ bgColor: string; textColor: string; isActive: boolean }>`
  user-select: none;
  opacity: 1;
  border: 2px solid transparent;
  border-radius: ${(props) => (props.isActive ? '12px 12px 0 0' : '12px')};
  cursor: pointer;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  min-height: 38px;
  padding: 7px 30px 7px 13px;
  width: 100%;
  outline: none;
  box-shadow: ${(props) => (props.isActive ? '0 5px 25px -4px rgba(0,0,0,.05)' : 'none')};
`

const SelectIconStyled = styled('i')<{ textColor: string; isActive: boolean; isDisabled: boolean }>`
  z-index: 4;
  position: absolute;
  right: 15px;
  margin-top: ${(props) => (props.isActive ? '0' : '-2px')};
  pointer-events: none;
  cursor: pointer;
  width: 7px;
  height: 7px;
  transform: ${(props) => (props.isActive ? 'rotate(45deg)' : 'rotate(-135deg)')};
  transform-origin: center;
  opacity: ${(props) => (props.isDisabled ? '.6' : '1')};

  &:before {
    width: 1px;
    height: 100%;
    content: '';
    background: ${(props) => props.textColor};
    position: absolute;
    display: block;
    top: 0;
  }

  &:after {
    width: 100%;
    height: 1px;
    content: '';
    background: ${(props) => props.textColor};
    position: absolute;
    display: block;
    top: 0;
  }
`

const SelectLoaderStyled = styled('div')<{ loaderColor: string }>`
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

const SelectPlaceHolderStyled = styled('label')<{ hasValue: boolean }>`
  position: absolute;
  left: 0;
  padding-left: 12px;
  font-size: 0.8rem;
  pointer-events: none;
  opacity: ${(props) => (props.hasValue ? '1' : '.4')};
  transform: ${(props) => (props.hasValue ? 'translate(-3%,-32px)' : 'translate(0,0)')};
`

const SelectMessageStyled = styled('label')<{ textColor: string }>`
  position: absolute;
  right: 0;
  padding-right: 12px;
  font-size: 0.7rem;
  pointer-events: none;
  color: ${(props) => props.textColor};
  bottom: -20px;
`

const SelectListStyled = styled('div')<{ bgColor: string }>`
  position: absolute;
  background-color: ${(props) => props.bgColor};
  max-height: 200px;
  width: 100%;
  top: 22px;
  animation: select-menu 0.25s ease forwards;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  padding: 4px 7px 4px 7px;
  z-index: 5;
`

const SelectListItemStyled = styled('button')<{ textColor: string; hoverTextColor: string }>`
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 5px;
  display: flex;
  margin: 2px 0;
  padding: 6px 10px;
  text-align: left;
  transition: padding 0.25s ease;
  cursor: pointer;
  color: ${(props) => props.textColor};

  &:hover {
    padding-left: 14px;
    color: ${(props) => props.hoverTextColor};
  }
`

const SelectListItemSelectedStyled = styled('button')<{ bgColor: string; textColor: string }>`
  width: 100%;
  border: 0;
  background: ${(props) => props.bgColor};
  border-radius: 5px;
  display: flex;
  margin: 2px 0;
  padding: 6px 10px;
  text-align: left;
  transition: padding 0.25s ease;
  color: ${(props) => props.textColor};
`
