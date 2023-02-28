import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CSSProperties, ReactNode, useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'

interface ICollapse {
  title: string
  styleCollapse?: CSSProperties
  children: ReactNode
}

// dont't use margin with collapse

export const Collapse = ({ title, styleCollapse, children }: ICollapse) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  const [isShowCollapse, setShowCollapse] = useState(false)
  const refDiv = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div
        style={{
          borderBottom: `1px solid ${themeValue[darkTheme].colors.border}`,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          display: 'flex',
          justifyContent: 'space-between',
          height: 'full',
          cursor: 'pointer',
          ...styleCollapse,
        }}
        onClick={() => {
          setShowCollapse(!isShowCollapse)
        }}
      >
        {title}
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
          height: isShowCollapse ? 'min-content' : 0,
          //   height: isShowCollapse ? refDiv.current.offsetHeight : 0,
          transition: 'all 0.2s linear',
          overflow: 'hidden',
          minHeight: 'min-content',
        }}
      >
        <div style={{ padding: 10 }} ref={refDiv}>
          {children}
        </div>
      </div>
    </div>
  )
}
