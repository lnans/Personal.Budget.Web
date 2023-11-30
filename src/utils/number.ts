/**
 * Transorm number to string spaced number
 * ex: 12452.54 -> 12 452,54
 * @param value Number to transform
 * @returns Transformed number as string
 */
export function getNumberWithSpaces(value?: number): string {
  // TODO: implement this using Intl.NumberFormat
  if (value === undefined) {
    return '-'
  }

  const valueStr = value % 1 !== 0 ? value.toFixed(2) : value.toString()
  const parts = valueStr.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return parts.join(',')
}
