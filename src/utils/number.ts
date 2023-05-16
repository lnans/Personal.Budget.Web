import { MantineColor } from '@mantine/styles'

/**
 * Transorm number to string spaced number
 * ex: 12452.54 -> 12 452,54
 * @param value Number to transform
 * @returns Transformed number as string
 */
function getNumberWithSpaces(value?: number): string {
  if (value === undefined) {
    return '-'
  }

  const valueStr = value % 1 !== 0 ? value.toFixed(2) : value.toString()
  const parts = valueStr.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join(',')
}

/**
 * Get a correspondig color for a currency amount
 * @param value the currency value
 * @returns a mantine color
 */
function getNumberColor(value?: number): MantineColor {
  if (value === undefined) {
    return 'gray'
  }
  return value > 0 ? 'teal' : value < 0 ? 'red' : 'yellow'
}

export { getNumberWithSpaces, getNumberColor }
