const daysMap = [
  'components.calendar.day.monday',
  'components.calendar.day.tuesday',
  'components.calendar.day.wednesday',
  'components.calendar.day.thursday',
  'components.calendar.day.friday',
  'components.calendar.day.saturday',
  'components.calendar.day.sunday',
]
const monthMap = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const dateShortFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

export type DayDetails = {
  date: number
  day: number
  month: number
  timeStamp: number
  dayString: string
}

const getNumberOfDays = (year: number, month: number) => 32 - new Date(year, month, 32).getDate()

const getLocaleDateString = (lang: string, timeStamp: number): string => {
  return new Date(timeStamp).toLocaleDateString(lang, dateShortFormat)
}

const getDayDetails = (index: number, numberOfDays: number, firstDay: number, year: number, month: number): DayDetails => {
  const date = index - firstDay
  const day = index % 7

  let prevMonth = month - 1
  let prevYear = year - 1
  if (prevMonth < 0) {
    prevMonth = 11
    prevYear--
  }

  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth)
  const _date = (date < 0 ? prevMonthNumberOfDays + date : date % numberOfDays) + 1
  const _month = date < 0 ? -1 : date >= numberOfDays ? 1 : 0
  const timeStamp = new Date(year, month, _date).getTime()
  return {
    date: _date,
    month: _month,
    day,
    timeStamp,
    dayString: daysMap[day],
  }
}

const getMonthDetails = (year: number, month: number): DayDetails[] => {
  const firstDay = new Date(year, month).getDay() + 6 // for week start at Monday
  const numberOfDays = getNumberOfDays(year, month)
  const monthArray: DayDetails[] = []
  const rows = 6
  const cols = 7

  let index = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      monthArray.push(getDayDetails(index, numberOfDays, firstDay, year, month))
      index++
    }

    // clean rows with no days for current month
    if (monthArray.every((d) => d.month !== 0)) {
      monthArray.splice(0, cols)
    }
  }
  return monthArray
}

export { getMonthDetails, getLocaleDateString, daysMap, monthMap }
