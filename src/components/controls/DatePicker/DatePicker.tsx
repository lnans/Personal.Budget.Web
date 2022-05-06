import { useOuterClick } from '@hooks/useOuterClick'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUID } from 'react-uid'
import './DatePicker.scss'
import { DayDetails, daysMap, getLocaleDateString, getMonthDetails, monthMap } from './DatePickerFunctions'

export interface DatePickerProps {
  label: string
}

export default function DatePicker(props: DatePickerProps) {
  const { label } = props
  const [value, setValue] = useState<string>('')
  const [labelValue, setLabelValue] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [isActive, setIsActive] = useState(false)

  const uid = useUID()
  const calendarRef = useOuterClick<HTMLDivElement>(() => setIsActive(false))
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const changeYear = (offset: number) => {
    setCurrentYear((old) => old + offset)
  }

  const changeMonth = (offset: number) => {
    let year = currentYear
    let month = currentMonth + offset
    if (month === -1) {
      month = 11
      year--
    } else if (month === 12) {
      month = 0
      year++
    }
    setCurrentYear(year)
    setCurrentMonth(month)
  }

  const onSelectDate = (day: DayDetails) => {
    setValue(new Date(day.timeStamp).toISOString())
    setLabelValue(getLocaleDateString(language, day.timeStamp))
  }

  const Calendar = () => {
    const days = getMonthDetails(currentYear, currentMonth).map((day, index) => {
      return (
        <div
          className={'calendar-day-container' + (day.month !== 0 ? ' disabled' : '')}
          key={index}
          onClick={() => day.month === 0 && onSelectDate(day)}
        >
          <div className={`calendar-day` + (new Date(day.timeStamp).toISOString() === value ? ' current' : '')}>
            {day.date}
          </div>
        </div>
      )
    })

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          {daysMap.map((d, i) => (
            <div key={i} className="calendar-header-days">
              {t(d)}
            </div>
          ))}
        </div>
        <div className="calendar-body">{days}</div>
      </div>
    )
  }

  const containerClasses = clsx({
    'date-picker-container': true,
    'date-picker--isActive': isActive,
    'date-picker--hasValue': !!value,
  })

  return (
    <div ref={calendarRef} className={containerClasses}>
      <div className="date-picker-content">
        <input id={uid} readOnly value={value} className="date-picker" type="text" onFocus={() => setIsActive(true)} />
        <label htmlFor={uid} className="date-picker__label">
          {label}
        </label>
        <label htmlFor={uid} className="date-picker__value">
          {labelValue}
        </label>
        {isActive && (
          <div id="test" className="date-picker-calendar">
            <div className="date-picker-calendar__header">
              <button className="date-picker-calendar_button" onClick={() => changeYear(-1)}>
                <i className="bx bx-chevrons-left" />
              </button>
              <button className="date-picker-calendar_button" onClick={() => changeMonth(-1)}>
                <i className="bx bx-chevron-left" />
              </button>
              <div className="date-picker-calendar__current">
                <p className="date-picker-calendar__current-year">{currentYear}</p>
                <p className="date-picker-calendar__current-month">
                  {t(`components.calendar.month.${monthMap[currentMonth]}`)}
                </p>
              </div>
              <button className="date-picker-calendar_button" onClick={() => changeMonth(1)}>
                <i className="bx bx-chevron-right" />
              </button>
              <button className="date-picker-calendar_button" onClick={() => changeYear(1)}>
                <i className="bx bx-chevrons-right" />
              </button>
            </div>
            <div className="date-picker-calendar__body">
              <Calendar />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
