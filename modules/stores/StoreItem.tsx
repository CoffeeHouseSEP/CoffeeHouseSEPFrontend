import { BranchResponse } from '@/types/branch/branch'
import { useEffect, useState } from 'react'

interface IPropBranch {
  data: BranchResponse[] | undefined
}
export default function StoreItem({ data }: IPropBranch) {
  const [numberBranch, setNumberBranch] = useState<Number>(0)
  useEffect(() => {
    if (data) {
      setNumberBranch(data?.length)
    }
  }, [])

  return (
    <div>
      <div> Tìm được {numberBranch.toString()} quán </div>

      {data?.map((item, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div>{item.address}</div>
          <div>{item.phoneNumber}</div>
          <div> Open từ 7:00 – 23:00 * 7 ngày/ tuần</div>
          <div> Wifi miễn phí</div>
          <div> Thanh toán bằng thẻ</div>
        </div>
      ))}
    </div>
  )
}
