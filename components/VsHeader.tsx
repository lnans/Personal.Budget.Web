import styled from 'styled-components'

export interface VsHeaderProps {
  children?: React.ReactNode
}

export default function VsHeader(props: VsHeaderProps) {
  return <HeaderStyled>{props.children}</HeaderStyled>
}

const HeaderStyled = styled('header')`
  width: 100%;
  display: flex;
  padding: 16px 16px 10px 16px;
  align-items: center;
  justify-content: center;
`
