import { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../../styles/_colors.module.scss'

export interface RsCheckBoxProps {
  label: string
  value: boolean
  compact?: boolean
  onChange?: (value: boolean) => void
}

export default function RsCheckBox(props: RsCheckBoxProps) {
  const { value, label, onChange, compact } = props
  const [isChecked, setIsChecked] = useState<boolean>(value ?? false)

  useEffect(() => {
    onChange && onChange(isChecked)
  }, [isChecked])

  return (
    <CheckBoxContainerStyled compact={!!compact}>
      <CheckBoxContentStyled>
        <CheckBoxStyled type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <CheckBoxMaskStyled>
          <CheckBoxIconStyled>
            <CheckBoxIconLineContainerStyled>
              <CheckBoxIconLine1Styled className="line1" />
              <CheckBoxIconLine2Styled className="line2" />
            </CheckBoxIconLineContainerStyled>
          </CheckBoxIconStyled>
        </CheckBoxMaskStyled>
      </CheckBoxContentStyled>
      <CheckBoxLabelStyled>{label}</CheckBoxLabelStyled>
    </CheckBoxContainerStyled>
  )
}
const CheckBoxContainerStyled = styled('div')<{ compact: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: ${(props) => (props.compact ? '5px' : '26px 5px 5px 5px')};
`

const CheckBoxContentStyled = styled('div')`
  width: 23px;
  height: 23px;
  border-radius: 9px;
  position: relative;
  z-index: 1;
`

const CheckBoxStyled = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 100;
  cursor: pointer;

  &:checked + div:before {
    opacity: 0;
    transform: scale(1.2);
  }

  &:checked + div > i {
    opacity: 1;
  }

  &:checked + div .line1:after {
    width: 100%;
    transition: all 0.25s ease 0.1s;
  }

  &:checked + div .line2:after {
    transition: all 0.2s ease 0.3s;
    height: 100%;
  }

  &:checked + div:after {
    opacity: 1;
    transform: scale(1);
  }
`

const CheckBoxMaskStyled = styled('div')`
  border-radius: 32%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
  cursor: pointer;
  pointer-events: none;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: inherit;
    transition: all 0.25s ease;
    border: ${() => `2px solid rgba(${colors.gray4},1)`};
    box-sizing: border-box;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: ${() => `rgba(${colors.primary}, 1)`};
    border-radius: inherit;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.25s ease;
  }
`

const CheckBoxLabelStyled = styled('label')`
  user-select: none;
  cursor: pointer;
  padding: 7px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.25s ease;

  &:before {
    position: absolute;
    width: 0;
    height: 2px;
    background: ${() => `rgba(${colors.black}, .6)`};
    content: '';
  }
`

const CheckBoxIconStyled = styled('i')`
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  border-radius: inherit;
  opacity: 0;
`

const CheckBoxIconLineContainerStyled = styled('span')`
  transform: rotate(45deg);
  display: block;
  position: relative;
  width: 8px;
  height: 13px;
  margin-top: -4px;
`

const CheckBoxIconLine1Styled = styled('div')`
  background: transparent;
  content: '';
  position: absolute;
  height: 2px;
  border-radius: 2px;
  transition: all 0.2s ease;
  border-radius: 5px;
  z-index: 100;
  width: 8px;
  bottom: 0;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #fff;
    transition: all 0.25s ease;
    border-radius: 5px 0 0 5px;
  }
`

const CheckBoxIconLine2Styled = styled('div')`
  bottom: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  content: '';
  position: absolute;
  height: 13px;
  border-radius: 5px;
  transition: all 0.2s ease;
  width: 2px;

  &:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 0%;
    background: #fff;
    transition: all 0.25s ease;
    bottom: 0;
    border-radius: 5px 5px 0 0;
  }
`
