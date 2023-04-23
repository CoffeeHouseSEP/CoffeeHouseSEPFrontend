import { CardBase } from '@/components'
import { useResponsive } from '@/hooks'
import { BranchResponse } from '@/types/branch/branch'
import { useRouter } from 'next/router'
import { BsArrowRight } from 'react-icons/bs'

interface CardFeedBackProps {
  data: BranchResponse
}

export const CardLocation = ({ data }: CardFeedBackProps) => {
  const pixel = useResponsive()
  const router = useRouter()
  return (
    <CardBase
      wrapperStyle={{
        padding: 50,
        justifyContent: 'start',
        outline: 'none',
        color: '#fff',
        cursor: 'pointer',
      }}
      child={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: 12,
            padding: 10,
            gap: 10,
          }}
          onClick={() => router.push(`/store/${data.branchId}`)}
        >
          <span>Xem</span> <BsArrowRight />
        </div>
      }
      title={{
        content: `${data.address}, ${data.ward}, ${data.district}, ${data.province}`,
        style: { color: '#fff', fontSize: pixel <= 1280 ? '1.4rem' : '2rem' },
        hoveredStyle: { color: '#75a8f9' },
      }}
    />
  )
}
