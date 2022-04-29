import { render, screen } from '@testing-library/react'
import SectionTitle from './section-title'

describe('● Render:', () => {
  test('should render childrens', () => {
    render(<SectionTitle>Test</SectionTitle>)

    const comp = screen.queryByText('Test')

    expect(comp).toBeTruthy()
    expect(comp).toBeInTheDocument()
    expect(comp?.innerHTML).toBe('Test')
  })
})
