import { FloatTray } from '@/components'
import { SpeedDialType } from '@/types'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'

interface IFloatTrayDetail {
  type: 'read' | 'update'
  handleSetTypeUpdate: Function
  callUpdate: Function
  callCancel: Function
  handleSetTypeRead: Function
}

export const FloatTrayDetail = ({
  type,
  handleSetTypeUpdate,
  callUpdate,
  callCancel,
  handleSetTypeRead,
}: IFloatTrayDetail) => {
  const getSpeedDiaList = () => {
    let speedList: SpeedDialType[] = []

    if (type === 'read') {
      speedList = [
        ...speedList,
        {
          label: <MdModeEditOutline style={{ width: '50%', height: '50%' }} />,
          function: handleSetTypeUpdate,
        },
        {
          label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
          router: '/admin/orders/management',
          color: 'warning',
        },
      ]
    }

    if (type === 'update') {
      speedList = [
        ...speedList,
        {
          label: <AiOutlineCheckCircle style={{ width: '60%', height: '60%' }} />,
          function: callUpdate,
        },
        {
          label: <AiOutlineCloseCircle style={{ width: '60%', height: '60%' }} />,
          function: callCancel,
        },
        {
          label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
          function: handleSetTypeRead,
          color: 'warning',
        },
      ]
    }

    return speedList
  }

  return <FloatTray buttonList={getSpeedDiaList()} />
}
