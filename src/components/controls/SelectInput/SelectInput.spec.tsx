import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { UseFormRegister } from 'react-hook-form'
import SelectField from './SelectInput'

type TestRequest = { value: string }
const onChange = jest.fn()
const register: UseFormRegister<TestRequest> = () => ({
  ref: () => jest.fn(),
  onChange,
  onBlur: jest.fn(),
  name: 'value',
})

const items = [
  { id: '1', value: 'Label 1' },
  { id: '2', value: 'Label 2' },
]

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
  })

  test('loading should render disabled', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} loading />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} disabled />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('with message should render error label', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} message="error" />)

    const input = await screen.findByLabelText('error')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
  })
})

describe('● When user focus:', () => {
  test('should render list items when component is active', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} />)

    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.focus(input)
    })

    const selectItems = screen.queryAllByTestId('select-item')

    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(2)
    expect(selectItems[0]).toBeInTheDocument()
    expect(selectItems[1]).toBeInTheDocument()
  })

  test('should not render list items when component is loading', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} loading />)

    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.focus(input)
    })

    const selectItems = screen.queryAllByTestId('select-item')

    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(0)
  })

  test('should not render list items when component is disabled', async () => {
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} disabled />)

    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.focus(input)
    })

    const selectItems = screen.queryAllByTestId('select-item')

    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(0)
  })
})

describe('● When user select an item', () => {
  afterEach(() => jest.clearAllMocks())
  test('not selected should trigger onChange with item id and hide item list', async () => {
    const { onChange } = register('value')
    render(<SelectField label="Select" itemKey="id" itemValue="value" items={items} register={register} name="value" />)

    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.focus(input)
    })

    let selectItems = screen.queryAllByTestId('select-item')
    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(2)

    act(() => {
      fireEvent.click(selectItems[0])
    })

    selectItems = screen.queryAllByTestId('select-item')
    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(0)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('already selected should not trigger onChange and not hide item list', async () => {
    const { onChange } = register('value')
    render(
      <SelectField
        label="Select"
        defaultValue="1"
        itemKey="id"
        itemValue="value"
        items={items}
        register={register}
        name="value"
      />
    )

    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.focus(input)
    })

    let selectItems = screen.queryAllByTestId('select-item')
    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(2)

    act(() => {
      fireEvent.click(selectItems[0])
    })

    selectItems = screen.queryAllByTestId('select-item')
    expect(selectItems).toBeTruthy()
    expect(selectItems.length).toBe(2)
    expect(onChange).not.toHaveBeenCalled()
  })
})
