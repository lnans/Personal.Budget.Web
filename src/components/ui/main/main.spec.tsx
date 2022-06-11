import { render, screen } from '@testing-library/react'
import Main from './main'

describe('● Render:', () => {
  test('should render childrens', () => {
    render(<Main>Test</Main>)

    const comp = screen.queryByText('Test')

    expect(comp).toBeTruthy()
    expect(comp).toBeInTheDocument()
    expect(comp?.innerHTML).toBe('Test')
  })
})
