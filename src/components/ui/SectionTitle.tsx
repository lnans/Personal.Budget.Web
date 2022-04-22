import { ReactNode } from 'react'
import styled from 'styled-components'
import colors from '../../styles/_colors.module.scss'

export interface SectionTitleProps {
  children: ReactNode
}

export default function SectionTitle(props: SectionTitleProps) {
  return <TitleStyled>{props.children}</TitleStyled>
}

const TitleStyled = styled('p')`
  font-weight: 700;
  font-size: 1.5rem;
  border-bottom: ${() => `1px solid rgba(${colors.gray4}, 1)`};
  padding-bottom: 7px;
  width: 100%;
`
