import { useTranslation, useTranslationFunction } from '@/hooks'
import { ParseValueForTable, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ActionType, ViewPointType } from '@/types'
import { NextRouter, useRouter } from 'next/router'
import { HTMLAttributes, MouseEvent, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Checkbox } from '../form'
import { Loading } from '../loading'

interface ICustomTable extends HTMLAttributes<HTMLTableElement> {
  header: ViewPointType[]
  body: { [key: string]: any }[]
  listActions?: ActionType[]
  handleChangeSelection?: Function
  loading?: boolean
  selectionMode?: 'single' | 'multiple' | 'none'
  disableAction?: boolean
  selectedKeys?: string[]
  detailPath: string
  idFiled: string
}

export function CustomTable({
  body,
  header,
  handleChangeSelection,
  listActions,
  loading,
  disableAction = false,
  selectionMode = 'none',
  selectedKeys,
  detailPath,
  idFiled,
  ...rest
}: ICustomTable) {
  const router = useRouter()
  const translate = useTranslationFunction()
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const listFunctionParseValue = ParseValueForTable()

  const [hoverId, setHoverId] = useState('')

  const detail = useTranslation('detail')

  const renderCell = (data: { [key: string]: any }, columnKey: React.Key) => {
    if (listFunctionParseValue?.[columnKey]) {
      return listFunctionParseValue[columnKey]!(data[columnKey])
    }

    if (typeof data?.[columnKey] === 'object') {
      return null
    }

    switch (columnKey) {
      case 'actions':
        return (
          listActions ?? [
            {
              content: detail,
              icon: <AiOutlineEye size={20} fill="#979797" />,
              func: (id: string, router: NextRouter) => {
                router.push(`/${detailPath}/${id}`)
              },
            },
          ]
        ).map((action) => (
          <div style={{ cursor: 'pointer' }}>
            {/* <Tooltip content={action.content}> */}
            <div
              onClick={(e) => {
                action.func(data[idFiled], router)
                e.stopPropagation()
              }}
            >
              {action.icon}
            </div>
            {/* </Tooltip> */}
          </div>
        ))
      case 'select':
        return <Checkbox isReadOnly isSelected={!!selectedKeys?.find((item) => item === data.id)} />
      default:
        return data[columnKey]?.toString()
    }
  }

  const handleChange = (event: MouseEvent<HTMLTableRowElement>) => {
    const value = event.currentTarget.id
    if (handleChangeSelection) {
      switch (selectionMode) {
        case 'single':
          if (selectedKeys?.[0] === value) {
            handleChangeSelection([])
          } else {
            handleChangeSelection([value])
          }
          break
        case 'multiple':
          if (!!selectedKeys?.find((item) => item === value)) {
            handleChangeSelection(selectedKeys.filter((item) => item !== value))
          } else {
            handleChangeSelection([...(selectedKeys ?? []), value])
          }
          break
        default:
          break
      }
    }
  }

  const getBackgroundColor = (itemId: string) => {
    if (!!selectedKeys?.find((item) => item === itemId)) {
      return themeValue[darkTheme].colors.blue200
    }
    if (hoverId === itemId) {
      return themeValue[darkTheme].colors.gray50
    }
    return undefined
  }

  const getTextColor = (itemId: string) => {
    if (!!selectedKeys?.find((item) => item === itemId)) {
      return themeValue[darkTheme].colors.primary
    }
    return themeValue[darkTheme].colors.gray900
  }

  if (loading)
    return (
      <div
        style={{ paddingTop: 20, textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  // this is condition for switching between selection and not selection
  let newHeader = [...header]
  if (!disableAction) {
    newHeader = [{ key: 'actions', label: '' }, ...header]
  }
  if (selectionMode !== 'none') {
    newHeader = [{ key: 'select', label: '' }, ...newHeader]
  }

  return (
    <div style={{ width: '100%', overflow: 'auto', padding: '16px 12px', paddingTop: 20 }}>
      <table
        {...rest}
        style={{ ...rest.style, borderCollapse: 'separate', borderSpacing: '0px 5px' }}
      >
        <thead>
          <tr>
            {newHeader.map((itemHead, index) => (
              <th
                style={{
                  padding: '4px 16px',
                  borderTopLeftRadius: index === 0 ? '12px' : undefined,
                  borderBottomLeftRadius: index === 0 ? '12px' : undefined,
                  borderTopRightRadius: index === newHeader.length - 1 ? '12px' : undefined,
                  borderBottomRightRadius: index === newHeader.length - 1 ? '12px' : undefined,
                  fontSize: '12px',
                  backgroundColor: themeValue[darkTheme].colors.gray50,
                  color: themeValue[darkTheme].colors.gray700,
                }}
                key={itemHead.key}
              >
                {translate(itemHead.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((itemBody) => (
            <tr
              style={{
                color: getTextColor(itemBody?.id),
                cursor: 'default',
              }}
              onMouseEnter={() => {
                setHoverId(itemBody?.id)
              }}
              onMouseLeave={() => {
                setHoverId('')
              }}
              key={itemBody?.id}
              onClick={handleChange}
              id={itemBody?.id}
            >
              {newHeader.map((itemHead, index) => {
                return (
                  <td
                    style={{
                      whiteSpace: 'normal',
                      padding: '10px 16px',
                      borderTopLeftRadius: index === 0 ? '12px' : undefined,
                      borderBottomLeftRadius: index === 0 ? '12px' : undefined,
                      borderTopRightRadius:
                        itemHead.key === header.at(-1)?.key ? '12px' : undefined,
                      borderBottomRightRadius:
                        itemHead.key === header.at(-1)?.key ? '12px' : undefined,
                      backgroundColor: getBackgroundColor(itemBody?.id),
                    }}
                    key={itemHead.key}
                  >
                    {renderCell(itemBody, itemHead.key)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
