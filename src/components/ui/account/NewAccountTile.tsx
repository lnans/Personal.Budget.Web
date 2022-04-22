import styled from 'styled-components'
import colors from '../../../styles/_colors.module.scss'

export interface NewAccounTileProps {
  onClick: () => void
}

export default function NewAccountTile(props: NewAccounTileProps) {
  return (
    <TileContainerStyled onClick={props.onClick}>
      <TileIconStyled>
        <i className="bx bx-plus"></i>
      </TileIconStyled>
    </TileContainerStyled>
  )
}

const TileContainerStyled = styled('div')`
  border-radius: 20px;
  border: ${() => `2px dashed rgba(${colors.primary}, .8)`};
  margin: 7px;
  min-width: 150px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const TileIconStyled = styled('div')`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${() => `rgba(${colors.primary}, .8)`};
  align-items: center;
  justify-content: center;

  & i {
    font-size: 1.5rem;
    color: #fff;
  }
`
