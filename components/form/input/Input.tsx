import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { PseudoType, ColorType } from '@/types'
import { InputHTMLAttributes, useId, forwardRef, useRef, useState, FocusEvent } from 'react'
import { useSelector } from 'react-redux'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string
  clearable?: boolean
  status?: ColorType
  underlined?: boolean
  labelLeft?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      helperText,
      labelLeft,
      status,
      clearable,
      underlined,
      label,
      style,
      onFocus,
      onBlur,
      disabled,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const { darkTheme } = useSelector(GeneralSettingsSelector)

    const id = useId()
    const refLabelLeft = useRef<HTMLSpanElement>(null)

    const [pseudo, setPseudo] = useState<PseudoType>('none')

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setPseudo('focus')
      if (onFocus) {
        onFocus(event)
      }
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setPseudo('none')
      if (onBlur) {
        onBlur(event)
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
          minWidth: 'content',
        }}
      >
        {label ? (
          <label
            style={{
              color: themeValue[darkTheme].colors[status ?? 'foreground'],
            }}
            htmlFor={id}
          >
            {label}
          </label>
        ) : undefined}
        <label
          htmlFor={id}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            ...style,
          }}
        >
          {labelLeft && (
            <span
              ref={refLabelLeft}
              style={{
                color: themeValue[darkTheme].colors[status ?? 'gray600'],
                padding: '0 0.5rem',
                borderRight: `1px solid ${themeValue[darkTheme].colors[status ?? 'gray600']}`,
                height: 'min-content',
                width: 'min-content',
                fontWeight: 500,
              }}
            >
              {labelLeft}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
            id={id}
            style={{
              width: `calc(100% - ${refLabelLeft?.current?.offsetWidth ?? 0}px)`,
              color: themeValue[darkTheme].colors.foreground,
              height: '2.5rem',
              background: 'transparent',
              padding: '0 0.5rem',
              cursor: disabled || readOnly ? 'default' : 'text',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {underlined ? (
            <>
              <hr
                style={{
                  transition: 'width 0.25s ease',
                  backgroundColor: themeValue[darkTheme].colors[status ?? 'foreground'],
                  position: 'absolute',
                  bottom: 0,
                  right: '50%',
                  translate: '50% 0',
                  height: '0.188rem',
                  zIndex: 0,
                  width: pseudo === 'focus' ? '100%' : '0',
                  opacity: pseudo === 'focus' ? '100%' : '0',
                  border: 0,
                }}
              />
              <hr
                style={{
                  transition: 'opacity 0.25s ease',
                  backgroundColor: themeValue[darkTheme].colors[status ?? 'border'],
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '0.125rem',
                  zIndex: 0,
                  opacity: pseudo === 'focus' ? '0' : '100%',
                  border: 0,
                }}
              />
            </>
          ) : null}
        </label>
        {helperText && (
          <div
            style={{
              fontSize: '10px',
              paddingLeft: '4px',
              color: themeValue[darkTheme].colors[status ?? 'foreground'],
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)
