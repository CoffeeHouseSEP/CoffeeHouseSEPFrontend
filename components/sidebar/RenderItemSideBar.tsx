import { useTranslation } from '@/hooks'
import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { NavBarItemType } from '@/types'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'

interface IRenderItemSideBar {
  item: NavBarItemType
  hasDivide: boolean
  level: number
}

export const RenderItemSideBar = ({ item, hasDivide, level }: IRenderItemSideBar) => {
  const router = useRouter()
  const [isShowCollapse, setShowCollapse] = useState(false)
  const [hover, setHover] = useState(false)
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const refDiv = useRef<HTMLDivElement>(null)

  const thisLabel = useTranslation(item.label)

  if (item?.children?.length) {
    return (
      <div key={item.path}>
        <div
          style={{
            borderBottom: hasDivide ? '1px solid #00000026' : '',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: level * 10,
            paddingRight: 10,
            display: 'flex',
            justifyContent: 'space-between',
            height: 'full',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowCollapse(!isShowCollapse)
          }}
        >
          {thisLabel}
          <div
            style={{
              transform: isShowCollapse ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'all 0.2s linear',
            }}
          >
            <MdOutlineArrowBackIosNew />
          </div>
        </div>
        <div
          style={{
            height: isShowCollapse ? refDiv.current?.offsetHeight : 0,
            transition: 'all 0.2s linear',
            overflow: 'hidden',
          }}
        >
          <div ref={refDiv}>
            {item.children.map((child) => (
              <RenderItemSideBar key={child.path} item={child} hasDivide level={level + 1} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      key={item.path}
      style={{
        borderBottom: hasDivide ? '1px solid #00000026' : '',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: level * 10,
        cursor: 'pointer',
        backgroundColor: hover ? themeValue[darkTheme].colors.blue200 : '',
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      onClick={() => {
        if (item.path !== router.pathname) {
          router.push(item.path)
        }
      }}
    >
      {thisLabel}
    </div>
  )
}
