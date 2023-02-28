import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ColorType } from '@/types'
import { useRouter } from 'next/router'
import { CSSProperties } from 'react'
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { DOTS, usePagination } from './usePagination'

export interface PaginationListProps {
  onChange: (input: number) => void
  total: number
  page: number
  pageSize?: number
  siblingCount?: number
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  firstIcon?: React.ReactNode
  lastIcon?: React.ReactNode
  paginationStyle?: CSSProperties
  buttonSize?: number
  color?: ColorType
}

export const Pagination = ({
  onChange,
  total,
  siblingCount = 1,
  page,
  pageSize = 10,
  previousIcon,
  nextIcon,
  firstIcon,
  lastIcon,
  paginationStyle,
  buttonSize = 36,
  color = 'primary',
}: PaginationListProps) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const paginationRange = usePagination({
    page,
    total,
    siblingCount,
    pageSize,
  })

  const router = useRouter()

  const onNext = () => {
    onChange(page + 1)
    router.query.page = (page + 1).toString()
    router.push(router, undefined, { shallow: true })
  }

  const onPrevious = () => {
    onChange(page - 1)
    router.query.page = (page - 1).toString()
    router.push(router, undefined, { shallow: true })
  }

  const onChoosePage = (page: number) => {
    onChange(page)
    router.query.page = page.toString()
    router.push(router, undefined, { shallow: true })
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div
      style={{
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        ...paginationStyle,
      }}
    >
      <button
        type="button"
        style={{
          width: buttonSize,
          color: themeValue[darkTheme].colors.gray900,
          backgroundColor: themeValue[darkTheme].colors.gray50,
          borderRadius: '33%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={page === 1}
        onClick={() => onChoosePage(1)}
      >
        {firstIcon || <AiOutlineDoubleLeft />}
      </button>
      <button
        type="button"
        style={{
          width: buttonSize,
          color: themeValue[darkTheme].colors.gray900,
          backgroundColor: themeValue[darkTheme].colors.gray50,
          borderRadius: '33%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={page === 1}
        onClick={onPrevious}
      >
        {previousIcon || <AiOutlineLeft />}
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={index}
              style={{
                width: buttonSize,
                color: themeValue[darkTheme].colors.gray900,
                backgroundColor: themeValue[darkTheme].colors.gray50,
                borderRadius: '33%',
                aspectRatio: '1',
                textAlign: 'center',
              }}
            >
              &#8230;
            </div>
          )
        }

        return (
          <div
            key={index}
            onClick={() => onChoosePage(pageNumber as number)}
            style={{
              width: buttonSize,
              color: page === pageNumber ? 'white' : themeValue[darkTheme].colors.gray900,
              backgroundColor:
                page === pageNumber
                  ? themeValue[darkTheme].colors[color]
                  : themeValue[darkTheme].colors.gray50,
              borderRadius: '33%',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 500,
              textTransform: 'capitalize',
              transition:
                'transform 0.25s ease 0s, background 0.25s ease 0s, box-shadow 0.25s ease 0s',
            }}
          >
            <div>{pageNumber}</div>
          </div>
        )
      })}
      <button
        type="button"
        style={{
          width: buttonSize,
          color: themeValue[darkTheme].colors.gray900,
          backgroundColor: themeValue[darkTheme].colors.gray50,
          borderRadius: '33%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={page === lastPage}
        onClick={onNext}
      >
        <div>{nextIcon || <AiOutlineRight />}</div>
      </button>
      <button
        type="button"
        style={{
          width: buttonSize,
          color: themeValue[darkTheme].colors.gray900,
          backgroundColor: themeValue[darkTheme].colors.gray50,
          borderRadius: '33%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={page === lastPage}
        onClick={() => onChoosePage(lastPage as number)}
      >
        {lastIcon || <AiOutlineDoubleRight />}
      </button>
    </div>
  )
}
