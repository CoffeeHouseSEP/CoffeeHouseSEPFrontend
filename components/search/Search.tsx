import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { BiSearch } from 'react-icons/bi'
import { useSelector } from 'react-redux'

interface SearchProps {
  placeholder?: string
  children?: React.ReactNode
}

export const Search = ({ placeholder = 'search cl', children }: SearchProps) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <label
      htmlFor="search-content"
      style={{
        width: '30%',
        backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
        height: '90%',
        borderRadius: '30px',
        display: 'flex',
        padding: '0px 15px',
        alignItems: 'center',
        border: `1px solid ${themeValue[darkTheme].colors.foreground}`,
        boxShadow: themeValue[darkTheme].shadows.md,
      }}
    >
      <BiSearch size={20} color={themeValue[darkTheme].colors.foreground} />
      <div style={{ flexGrow: 1 }}>
        <input
          id="search-content"
          style={{
            paddingLeft: 5,
            fontWeight: 400,
            width: '100%',
            color: themeValue[darkTheme].colors.foreground,
            fontSize: 20,
            lineHeight: 0,
            backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          }}
          placeholder={placeholder}
        />
      </div>
      <div style={{ position: 'fixed' }}>{children}</div>
    </label>
  )
}
