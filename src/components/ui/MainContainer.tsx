import { ReactNode } from 'react'
import styled from 'styled-components'

export interface MainContainerProps {
  children: ReactNode
}
export default function MainContainer(props: MainContainerProps) {
  return <MainContainerStyled>{props.children}</MainContainerStyled>
}

const MainContainerStyled = styled('main')`
  display: flex;
  width: 100%;
  max-height: calc(100vh - 50px);
  overflow: auto;
  padding-inline: 40px;
  margin-top: 50px;
  flex-wrap: wrap;
`
