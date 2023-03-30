import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

export const FloatTrayDetail = () => {
  const getSpeedDiaList = () => {
    let speedList: SpeedDialType[] = []

    speedList = [
      ...speedList,
      {
        label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
        router: '/admin/category/management',
        color: 'warning',
      },
    ]

    return speedList
  }

  return <FloatTray buttonList={getSpeedDiaList()} />
}
