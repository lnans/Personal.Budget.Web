import { useOuterClick } from '@hooks/useOuterClick'
import { useRegisterOrUndefined } from '@hooks/useRegisterOrUndefined'
import clsx from 'clsx'
import { ChangeEvent, useRef, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUID } from 'react-uid'
import './DatePicker.scss'
import { DayDetails, daysMap, getLocaleDateString, getMonthDetails, monthMap } from './DatePickerFunctions'

export interface DatePickerProps<TFormValues> {
  label: string
  defaultValue?: string
  disabled?: boolean
  error?: string
  register?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

export default function DatePicker<TFormValues>(props: DatePickerProps<TFormValues>) {
  const { label, defaultValue, disabled, error, register, name } = props

  const [value, setValue] = useState<string>(defaultValue ?? '')
  const [labelValue, setLabelValue] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [isActive, setIsActive] = useState(false)

  const uid = useUID()
  const calendarRef = useOuterClick<HTMLDivElement>(() => setIsActive(false))
  const { inputRef, onChange, formRegister } = useRegisterOrUndefined(register, name)
  const _inputRef = useRef<HTMLInputElement | null>(null)
  const {
    t,
    i18n: { language },
  } = useTranslation()

  /**
   * Select event on calendar
   * Trigger native input event to use value input and react hook form
   * @param {DayDetails} day Selected day
   */
  const onSelectDate = (day: DayDetails) => {
    setLabelValue(getLocaleDateString(language, day.timeStamp))

    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    nativeInputSetter?.call(_inputRef.current, new Date(day.timeStamp).toISOString())

    const e = new Event('input', { bubbles: true })
    _inputRef.current?.dispatchEvent(e)
  }

  const nativeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsActive(false)
    onChange && onChange(e)
  }

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

  const containerClasses = clsx({
    'date-picker-container': true,
    'date-picker--isActive': isActive,
    'date-picker--hasValue': !!value,
    'date-picker--disabled': disabled,
  })

  return (
    <div ref={calendarRef} className={containerClasses}>
      <div className="date-picker-content">
        <input
          id={uid}
          data-testid="date-picker"
          readOnly
          disabled={!!disabled}
          ref={(e) => {
            inputRef && inputRef(e)
            _inputRef.current = e
          }}
          {...formRegister}
          onChange={nativeInputChange}
          defaultValue={defaultValue}
          className="date-picker"
          type="text"
          onFocus={() => setIsActive(true)}
          autoComplete="off"
        />
        <span className="date-picker__icon">
          <i className="bx bx-calendar" />
        </span>

        <label htmlFor={uid} className="date-picker__label">
          {label}
        </label>
        <label htmlFor={uid} className="date-picker__value">
          {labelValue}
        </label>
        {error && (
          <label className="date-picker__error" htmlFor={uid}>
            {error}
          </label>
        )}

        {/* Calendar container */}
        {isActive && (
          <div className="date-picker-calendar" data-testid="date-picker-calendar">
            {/* Calendar controls */}
            <div className="date-picker-calendar__header">
              <button type="button" className="date-picker-calendar_button" onClick={() => changeYear(-1)}>
                <i className="bx bx-chevrons-left" />
              </button>
              <button type="button" className="date-picker-calendar_button" onClick={() => changeMonth(-1)}>
                <i className="bx bx-chevron-left" />
              </button>
              <div className="date-picker-calendar__current">
                <p className="date-picker-calendar__current-year">{currentYear}</p>
                <p className="date-picker-calendar__current-month">
                  {t(`components.calendar.month.${monthMap[currentMonth]}`)}
                </p>
              </div>
              <button type="button" className="date-picker-calendar_button" onClick={() => changeMonth(1)}>
                <i className="bx bx-chevron-right" />
              </button>
              <button type="button" className="date-picker-calendar_button" onClick={() => changeYear(1)}>
                <i className="bx bx-chevrons-right" />
              </button>
            </div>

            {/* Calendar Body */}
            <div className="date-picker-calendar__body">
              <div className="calendar-container">
                {/* Calendar week days labels */}
                <div className="calendar-header">
                  {daysMap.map((d, i) => (
                    <div key={i} className="calendar-header-days">
                      {t(d)}
                    </div>
                  ))}
                </div>

                {/* Calendar days list */}
                <div className="calendar-body">
                  {getMonthDetails(currentYear, currentMonth).map((day, index) => (
                    <div
                      className={'calendar-day-container' + (day.month !== 0 ? ' disabled' : '')}
                      key={index}
                      data-testid="date-picker-day"
                      onClick={() => day.month === 0 && onSelectDate(day)}
                    >
                      <div
                        className={`calendar-day` + (new Date(day.timeStamp).toISOString() === value ? ' current' : '')}
                      >
                        {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
