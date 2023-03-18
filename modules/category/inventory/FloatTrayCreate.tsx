import { FloatTray } from '@/components'
import { FiSave } from 'react-icons/fi'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

interface IFloatTrayCreate {
  directManagement: Function
  callCreate: Function
}

export const FloatTrayCreate = ({ directManagement, callCreate }: IFloatTrayCreate) => {
  return (
    <FloatTray
      buttonList={[
        {
          label: <FiSave style={{ width: '60%', height: '60%' }} />,
          function: callCreate,
          color: 'primary',
        },
        {
          label: <IoArrowBackCircleOutline style={{ width: '60%', height: '60%' }} />,
          function: directManagement,
          color: 'warning',
        },
      ]}
    />
  )
}
