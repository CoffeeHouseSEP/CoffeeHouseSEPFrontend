import { Loading } from '../loading'
import { Modal } from '../modal'

interface BackDropLoadingProp {
  isOpen: boolean
}

export const BackdropLoading = ({ isOpen }: BackDropLoadingProp) => {
  return (
    <Modal open={isOpen} preventClose zIndex={100000}>
      <Loading size={100} />
    </Modal>
  )
}
