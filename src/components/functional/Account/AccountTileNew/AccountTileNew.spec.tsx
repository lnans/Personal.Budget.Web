import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import AccountTileNew from './AccountTileNew'

describe('● Render', () => {
  test('default', () => {
    const onClick = jest.fn()
    render(<AccountTileNew onClick={onClick} />)

    const tile = screen.queryByTestId('account-tile-new')

    expect(tile).toBeTruthy()
    expect(tile).toBeInTheDocument()
  })
})

describe('● When user click', () => {
  test('shoudl trigger onClick event', () => {
    const onClick = jest.fn()
    render(<AccountTileNew onClick={onClick} />)

    const tile = screen.getByTestId('account-tile-new')

    act(() => {
      fireEvent.click(tile)
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
