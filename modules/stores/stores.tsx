import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import StoreItem from './StoreItem'

export default function StoresInfo() {
  const translate = useTranslationFunction()
  const branchs = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = branchs
  useEffect(() => {
    setLetCall(true)
  }, [])

  return (
    <main>
      {!loading && (
        <section style={{ padding: '2rem 0', width: '90vw', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Tìm Quán Cà Phê</h2>
            <div
              style={{ width: '5rem', height: '0.25rem', background: '#2c2891', margin: '0 auto' }}
            />
          </div>
          <StoreItem data={data?.result.data} />
        </section>
      )}
    </main>
  )
}
