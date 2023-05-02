import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultBranch } from '@/inventory'
import { BranchForm } from '@/inventory/BranchForm'

import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { BranchRequest, BranchRequestFailure } from '@/types/branch/branch'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from '../inventory/FloatTrailCreate'

export default function BranchCreate() {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const [branchState, setBranchState] = useState<BranchRequest>(DefaultBranch)

  const createResult = useApiCall<BranchRequest, BranchRequestFailure>({
    callApi: () =>
      postMethod<BranchRequest>({
        pathName: apiRoute.branch.addBranch,
        token: cookies.token,
        request: branchState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/branch/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<BranchRequest>) => {
    const newUserState = { ...branchState }
    setBranchState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')
  const label = useTranslation('BranchCreatePascal')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/branch/management')
  }
  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{label}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{label}</h2>
        {breakPoint > 1 ? (
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <Button color="primary" onClick={callCreate} disabled={createResult.loading}>
              {createResult.loading ? <Loading /> : <>{saveLabel}</>}
            </Button>
            <Button color="warning" onClick={directManagement} disabled={createResult.loading}>
              {cancelLabel}
            </Button>
          </div>
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )}
      </div>
      <div style={{ paddingTop: 40 }}>
        <BranchForm
          type="update"
          branch={branchState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
