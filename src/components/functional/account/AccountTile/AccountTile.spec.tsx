import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import AccountTile from './AccountTile'

describe('● Render:', () => {
  test('with negative balance should have negative class', () => {
    const account = new AccountDetailsResponse()
    account.balance = -1
    render(<AccountTile account={account} />)

    const tile = screen.queryByTestId('account-tile-container')
    const balance = screen.queryByTestId('account-tile-balance')

    expect(tile).toBeTruthy()
    expect(tile).toBeInTheDocument()
    expect(balance).toBeTruthy()
    expect(balance).toBeInTheDocument()
    expect(balance?.classList).toContain('negative')
  })

  test('with empty balance should have zero class', () => {
    const account = new AccountDetailsResponse()
    account.balance = 0
    render(<AccountTile account={account} />)

    const tile = screen.queryByTestId('account-tile-container')
    const balance = screen.queryByTestId('account-tile-balance')

    expect(tile).toBeTruthy()
    expect(tile).toBeInTheDocument()
    expect(balance).toBeTruthy()
    expect(balance).toBeInTheDocument()
    expect(balance?.classList).toContain('zero')
  })

  test('with positive balance should have positive class', () => {
    const account = new AccountDetailsResponse()
    account.balance = 1
    render(<AccountTile account={account} />)

    const tile = screen.queryByTestId('account-tile-container')
    const balance = screen.queryByTestId('account-tile-balance')

    expect(tile).toBeTruthy()
    expect(tile).toBeInTheDocument()
    expect(balance).toBeTruthy()
    expect(balance).toBeInTheDocument()
    expect(balance?.classList).toContain('positive')
  })
})

describe('● When user click', () => {
  test('should trigger onClick event', () => {
    const onClick = jest.fn()
    const account = new AccountDetailsResponse()
    account.balance = 0
    render(<AccountTile account={account} onClick={onClick} />)

    const tile = screen.getByTestId('account-tile-container')

    act(() => {
      fireEvent.click(tile)
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
