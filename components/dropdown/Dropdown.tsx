import { addClassBody, removeClassBody, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ColorType, OptionsType } from '@/types'
import { useRef, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Backdrop } from '../backdrop'
import { Button } from '../button'
import { DropdownBase } from './DropdownBase'

interface IDropdown<T> {
  disabled?: boolean
  options: OptionsType<T>[]
  button: string
  styleType?: 'flat' | 'light' | 'ghost' | 'default'
  color?: ColorType
  onClick: Function
  zIndex?: number
  isCloseSelect?: boolean
}

export const Dropdown = <T,>({
  disabled,
  options,
  button,
  color,
  styleType,
  onClick,
  zIndex,
  isCloseSelect,
}: IDropdown<T>) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const [hoverItem, setHoverItem] = useState<T>()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleOpen = () => {
    addClassBody('overflow')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    removeClassBody('overflow')
  }

  const getColor = (item: OptionsType<T>) => {
    if (hoverItem === item.value) {
      return themeValue[darkTheme].colors.blue200
    }
    return ''
  }

  return (
    <div ref={divRef}>
      <Backdrop onClick={handleClose} isShow={!disabled && open} zIndex={(zIndex ?? 10) - 1} />
      <Button
        color={color}
        styleType={styleType}
        onClick={() => {
          if (open) {
            handleClose()
          } else {
            handleOpen()
          }
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {button}
        <MdArrowDropDown />
      </Button>
      <DropdownBase zIndex={zIndex} refParent={divRef} open={!disabled && open}>
        {options.map((item) => (
          <div
            style={{
              width: '100%',
              height: 40,
              padding: 10,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: getColor(item),
            }}
            onMouseMove={() => setHoverItem(item.value)}
            onMouseOut={() => setHoverItem(undefined)}
            onMouseDown={() => {
              onClick(item.value)
              if (isCloseSelect) {
                setOpen(false)
              }
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
