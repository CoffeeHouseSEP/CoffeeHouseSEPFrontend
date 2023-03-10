import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CategoryItem } from '@/types'
import { useSelector } from 'react-redux'

interface IGridCategory {
  list: CategoryItem[]
  setHover: (value: string) => void
}

export const GridCategory = ({ list, setHover }: IGridCategory) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
      onMouseLeave={() => setHover('')}
    >
      {list.map((item) => (
        <div style={{ width: '100%' }}>
          <div
            style={{
              color: themeValue[darkTheme].colors.orangeHighLand,
              width: '100%',
              padding: '10px 10px',
            }}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  )
}
