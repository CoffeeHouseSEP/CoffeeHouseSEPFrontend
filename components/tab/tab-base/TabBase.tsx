import { CSSProperties, ReactNode, useState } from 'react'

export interface TabBaseProps {
  tabData: string[]
  tabItem: ReactNode
  tabContainerStyle?: CSSProperties
  tabStyle?: CSSProperties
  tabItemStyle?: CSSProperties
  onHandleChangeTab?: Function
  underline?: boolean
}

export default function TabBase(props: TabBaseProps) {
  const {
    tabData,
    tabItem,
    tabStyle,
    tabContainerStyle,
    tabItemStyle,
    onHandleChangeTab,
    underline,
  } = props
  const [tab, setTab] = useState(tabData[0])
  if (!onHandleChangeTab) return null

  const handleSetTab = (item: string) => {
    onHandleChangeTab(item)
    setTab(item)
  }
  return (
    <div>
      <div style={{ ...tabContainerStyle }}>
        {tabData.map((item: string, index: number) => {
          return (
            <div
              key={index}
              style={{
                ...tabStyle,
                borderBottom: `${
                  tab === item && underline ? '2px solid rgb(83, 146, 249)' : 'none'
                }`,
                cursor: 'pointer',
              }}
              onClick={() => handleSetTab(item)}
            >
              {item}
            </div>
          )
        })}
      </div>
      <div style={{ ...tabItemStyle }}>{tabItem}</div>
    </div>
  )
}
