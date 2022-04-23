import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import styled, { css } from 'styled-components'
import colors from '../../../styles/_colors.module.scss'

export interface AccountTileProps {
  account: AccountDetailsResponse
  isSelected?: boolean
  onClick?: (id: string) => void
}

export default function AccountTile(props: AccountTileProps) {
  const { account, isSelected, onClick } = props

  let textColor = ''
  switch (true) {
    case account.balance === 0:
      textColor = `rgba(${colors.default}, 1)`
      break
    case account.balance > 0:
      textColor = `rgba(${colors.success}, 1)`
      break
    case account.balance < 0:
      textColor = `rgba(${colors.error}, 1)`
      break
  }

  const handleClick = () => {
    onClick && onClick(account.id)
  }

  return (
    <TileContainerStyled isSelected={!!isSelected} onClick={handleClick}>
      <TileTitleStyled>{account.name}</TileTitleStyled>
      <TileBalanceContainer>
        <TileIconStyled>
          <i className="bx bx-coin"></i>
        </TileIconStyled>
        <TileBalanceStyled textColor={textColor}>{account.balance.toString().replace('.', ',')} €</TileBalanceStyled>
      </TileBalanceContainer>
      <TileInfoStyled>
        <p>{account.bank}</p>
      </TileInfoStyled>
    </TileContainerStyled>
  )
}

const TileContainerStyled = styled('div')<{ isSelected: boolean }>`
  border-radius: 20px;
  background-color: #fff;
  margin: 7px;
  min-width: 250px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 20px 30px;
  filter: drop-shadow(0px 0px 4px rgba(6, 18, 55, 0.05));
  transition: transform 0.25s ease;

  ${(props) =>
    props.isSelected
      ? css`
          transform: translateY(-3px);
          border: ${() => `1px solid rgba(${colors.primary}, .3)`};
        `
      : null}

  &:hover {
    transform: translateY(-3px);
  }
`

const TileTitleStyled = styled('h4')`
  text-transform: capitalize;
  margin-bottom: 14px;
  font-weight: 700;
  font-size: 1rem;
`

const TileBalanceContainer = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`

const TileIconStyled = styled('div')`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${() => `rgba(${colors.gray4}, 1)`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  & i {
    color: ${() => `rgba(${colors.black}, .8)`};
  }
`

const TileBalanceStyled = styled('p')<{ textColor: string }>`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${(props) => props.textColor};
`

const TileInfoStyled = styled('div')`
  position: absolute;
  display: flex;
  align-self: flex-end;
  right: 21px;
  bottom: 10px;

  & p {
    font-weight: 700;
    font-size: 0.8rem;
    color: ${() => `rgba(${colors.black}, .8)`};
  }
`
