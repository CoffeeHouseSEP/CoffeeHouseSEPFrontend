import { Backdrop } from '@/components/backdrop'
import { DropdownBase } from '@/components/dropdown/DropdownBase'
import { addClassBody, removeClassBody } from '@/lib'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { Input } from '../input'
import { DayModal, getDayString, MonthModal, YearModal } from './inventory'

interface IDatePicker {
  value?: Date | string
  onChange: Function
  label: string
  buttonProps: HTMLAttributes<HTMLInputElement>
  disable?: boolean
  zIndex?: number
}

export const DatePicker = ({
  value,
  label,
  onChange,
  buttonProps,
  disable,
  zIndex,
}: IDatePicker) => {
  const nowDay = value ? new Date(value) : new Date()
  const [year, setYear] = useState(nowDay.getFullYear())
  const [month, setMonth] = useState(nowDay.getMonth() + 1)
  const [day, setDay] = useState(nowDay.getDate())

  const [type, setType] = useState<'day' | 'month' | 'year' | ''>('')
  const divRef = useRef<HTMLDivElement>(null)

  const [yearRange, setYearRange] = useState(year - (year % 10))

  const handleChaneMonth = (newMonth: number) => {
    if (newMonth > 0 && newMonth < 13) {
      setMonth(newMonth)
    }
  }

  useEffect(() => {
    if (year - yearRange > 10) setYearRange(year - (year % 10))
  }, [year])

  useEffect(() => {
    if (!value) {
      onChange(getDayString(day, month, year))
    }
  }, [value])

  const handleSetType = (v: 'day' | 'month' | 'year' | '') => {
    setType(v)
    if (v === '') {
      removeClassBody('overflow')
    } else {
      addClassBody('overflow')
    }
  }

  const obj = {
    year: (
      <YearModal
        year={year}
        yearRange={yearRange}
        setYear={setYear}
        setYearRange={setYearRange}
        setType={handleSetType}
      />
    ),
    month: (
      <MonthModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={handleSetType}
      />
    ),
    day: (
      <DayModal
        year={year}
        setYear={setYear}
        month={month}
        setMonth={handleChaneMonth}
        setType={handleSetType}
        day={day}
        setDay={setDay}
        onChange={onChange}
      />
    ),
    '': null,
  }

  return (
    <>
      <Backdrop
        onClick={() => {
          handleSetType('')
        }}
        isShow={type !== ''}
        zIndex={(zIndex ?? 10) - 1}
      />
      <div
        onClick={() => {
          if (!disable) {
            handleSetType('day')
          }
        }}
        ref={divRef}
        style={{ width: '100%' }}
      >
        <Input
          value={getDayString(nowDay.getDate(), nowDay.getMonth() + 1, nowDay.getFullYear())}
          label={label}
          readOnly
          {...buttonProps}
        />
      </div>
      <DropdownBase
        onClick={(event) => {
          event.stopPropagation()
        }}
        open={type !== ''}
        refParent={divRef}
        zIndex={zIndex}
      >
        <div style={{ height: 'fit-content', width: 300, minHeight: 260 }}>{obj[type]}</div>
      </DropdownBase>
    </>
  )
}
