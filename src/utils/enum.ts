import { SelectItem } from '@mantine/core'
import { TFunction } from 'i18next'

/**
 * Get a SelectItem array from native enum
 * To be used for mantine select component
 * @param enumToList the enum to list
 * @param transKey i18n base key for labels translation
 * @param i18n i18n instance
 * @returns
 */
function getSelectItemsfromEnum<T extends object>(
  enumToList: T,
  transKey: string,
  i18n: TFunction<'translation', undefined, 'translation'>
): SelectItem[] {
  const keys = Object.keys(enumToList) as Array<string>

  return keys.map((key) => ({
    value: key,
    label: i18n(`${transKey}.${key}`) ?? '',
  }))
}

export { getSelectItemsfromEnum }
