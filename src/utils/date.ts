export const isValidDate = (date: string) => {
  return !isNaN(Date.parse(date))
}

export const formatShortDate = (lang: string, date: string): string => {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(date))
}

export const formatLongDate = (lang: string, date: string) => {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}
