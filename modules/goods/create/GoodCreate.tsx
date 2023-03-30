import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultGoods } from '@/inventory'
import { GoodsForm } from '@/inventory/GoodsForm'

import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { GoodsRequest, GoodsRequestFailure } from '@/types/goods/goods'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function GoodCreate() {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const [goodsState, setGoodsState] = useState<GoodsRequest>(DefaultGoods)

  const createResult = useApiCall<GoodsRequest, GoodsRequestFailure>({
    callApi: () =>
      postMethod<GoodsRequest>({
        pathName: apiRoute.goods.createGoods,
        token: cookies.token,
        request: goodsState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/good/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<GoodsRequest>) => {
    const newUserState = { ...goodsState }
    setGoodsState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/good/management')
  }
  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{breadCrumb}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{breadCrumb}</h2>
        {/* {breakPoint > 1 ? (
     
        ) : (
          <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
        )} */}
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
      </div>
      <div style={{ paddingTop: 40 }}>
        <GoodsForm
          type="update"
          goods={goodsState}
          onchangeGoodsState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
