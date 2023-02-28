import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getListMonth } from './DatePicker.inventory'

interface IMonthModal {
  month: number
  setMonth: Function
  setType: Function
  year: number
  setYear: Function
}

export const MonthModal = ({ setMonth, month, setType, setYear, year }: IMonthModal) => {
  const [hoverItem, setHoverItem] = useState(-1)

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getColor = (item: number) => {
    if (month === item) {
      return themeValue[darkTheme].colors.blue400
    }
    if (hoverItem === item) {
      return themeValue[darkTheme].colors.blue200
    }
    return ''
  }

  return (
    <>
      <div
        style={{
          height: 40,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setYear(year - 1)
          }}
        >
          {'<<'}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setType('year')
          }}
        >
          {year}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setYear(year + 1)
          }}
        >
          {'>>'}
        </div>

        <hr
          style={{
            height: '1px',
            backgroundColor: themeValue[darkTheme].colors.border,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          padding: 10,
        }}
      >
        {getListMonth().map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getColor(item),
              borderRadius: '12px',
            }}
            onMouseMove={() => setHoverItem(item)}
            onMouseOut={() => setHoverItem(-1)}
            onMouseDown={() => {
              setMonth(item)
              setType('day')
            }}
            onBlur={() => {}}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  )
}
