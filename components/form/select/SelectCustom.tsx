import { DropdownBase } from '@/components/dropdown/DropdownBase'
import { addClassBody, removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { OptionsType } from '@/types'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../input'

interface ISelectCustom<T> {
  value: T
  onChange: (value: T) => void
  label?: string
  disabled?: boolean
  buttonProps: Partial<any>
  options: OptionsType<T>[]
  zIndex?: number
}

export const SelectCustom = <T,>({
  value,
  onChange,
  label,
  disabled,
  options,
  buttonProps,
  zIndex,
}: ISelectCustom<T>) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<T>()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true)
      addClassBody('overflow')
    }
  }

  const handleClose = () => {
    setOpen(false)
    removeClassBody('overflow')
  }

  const getColor = (item: OptionsType<T>) => {
    if (value === item.value) {
      return themeValue[darkTheme].colors.blue400
    }
    if (hoverItem === item.value) {
      return themeValue[darkTheme].colors.blue200
    }
    return ''
  }

  const display = options.find((item) => item.value === value)

  return (
    <div ref={divRef} style={{ width: '100%' }}>
      <Input
        value={display ? display.label : ''}
        label={label}
        readOnly
        onFocus={handleOpen}
        onBlur={handleClose}
        {...buttonProps}
      />
      <DropdownBase open={open} refParent={divRef} zIndex={zIndex} typeWidth="full">
        {options.map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 10,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item.value)}
            onMouseOut={() => setHoverItem(undefined)}
            onMouseDown={() => {
              onChange(item.value)
            }}
            onBlur={() => {}}
            key={item.value?.toString()}
          >
            {item.label}
          </div>
        ))}
      </DropdownBase>
    </div>
  )
}
