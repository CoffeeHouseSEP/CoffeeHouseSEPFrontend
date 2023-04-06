import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultBranch } from '@/inventory'
import { BranchForm } from '@/inventory/BranchForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { BranchRequest, BranchRequestFailure, BranchResponse } from '@/types/branch/branch'
import { ImageResponse } from '@/types/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from '../inventory/FloatTrailDetail'

export const BranchDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [branchState, setBranchState] = useState<BranchRequest>(DefaultBranch)
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const imageResult = useApiCall<ImageResponse, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.image.imageInfo,
        token: cookies.token,
        params: {
          objectId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setBranchState({
        ...branchState,
        image: data,
      })
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const viewResult = useApiCall<CommonListResultType<BranchResponse>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
        token: cookies.token,
        params: {
          branchId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setBranchState({
        ...DefaultBranch,
        ...data.data[0],
      })
      imageResult.setLetCall(true)
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<BranchRequest, BranchRequestFailure>({
    callApi: () =>
      putMethod<BranchRequest>({
        pathName: apiRoute.branch.updateBranch,
        token: cookies.token,
        params: { branchId: branchState.branchId },
        request: branchState,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      viewResult.setLetCall(true)
      setType('read')
    },
  })

  useEffect(() => {
    if (!!id) {
      viewResult.setLetCall(true)
    }
  }, [id])

  const onchangeUserState = (newUpdate: Partial<BranchRequest>) => {
    const newUserState = { ...branchState }
    setBranchState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')
  const saveLabel = useTranslation('saveLabel')
  const editLabel = useTranslation('edit')
  const breadCrumb = useGetBreadCrumb()

  if (viewResult.loading)
    return (
      <div
        style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center' }}
      >
        <Loading />
      </div>
    )

  const handleSetTypeUpdate = () => {
    setType('update')
  }

  const callUpdate = () => {
    updateResult.setLetCall(true)
  }

  const handleSetTypeRead = () => {
    if (viewResult?.data?.result)
      setBranchState({ ...DefaultBranch, ...viewResult.data.result.data[0] })
    setType('read')
    updateResult.handleReset()
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        {breakPoint > 1 ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {type === 'read' ? (
                <>
                  <Button onClick={handleSetTypeUpdate}>{editLabel}</Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      router.push('/admin/branch/management')
                    }}
                  >
                    {cancelLabel}
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" onClick={callUpdate} disabled={updateResult.loading}>
                    {updateResult.loading ? <Loading /> : <>{saveLabel}</>}
                  </Button>
                  <Button
                    color="warning"
                    onClick={handleSetTypeRead}
                    disabled={updateResult.loading}
                  >
                    {cancelLabel}
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <FloatTrayDetail
            type={type}
            handleSetTypeUpdate={handleSetTypeUpdate}
            callUpdate={callUpdate}
            handleSetTypeRead={handleSetTypeRead}
          />
        )}
      </div>
      <div style={{ paddingTop: 20 }}>
        <BranchForm
          type={type}
          branch={branchState}
          onchangeUserState={onchangeUserState}
          errorState={updateResult.error?.result}
          selectManager={branchState.branchManagerId}
        />
      </div>
    </div>
  )
}
