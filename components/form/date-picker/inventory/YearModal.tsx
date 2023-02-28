import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getListYear } from './DatePicker.inventory'

interface IYearModal {
  year: number
  yearRange: number
  setYear: Function
  setYearRange: Function
  setType: Function
}

export const YearModal = ({ year, setYear, setYearRange, yearRange, setType }: IYearModal) => {
  const [hoverItem, setHoverItem] = useState(-1)

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const getColor = (item: number) => {
    if (year === item) {
      return themeValue[darkTheme].colors.blue400
    }
    if (hoverItem === item) {
      return themeValue[darkTheme].colors.blue200
    }
    return ''
  }

  return (
    <>
      {setYearRange}
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
            setYearRange(yearRange - 10)
          }}
        >
          {'<<'}
        </div>
        <div>
          {yearRange} - {yearRange + 9}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setYearRange(yearRange + 10)
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
        <div />
        {getListYear(yearRange).map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item)}
            onMouseOut={() => setHoverItem(-1)}
            onMouseDown={() => {
              setYear(item)
              setType('month')
            }}
            onBlur={() => {}}
            key={item}
          >
            {item}
          </div>
        ))}
        <div />
      </div>
    </>
  )
}
