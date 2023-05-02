import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultGoods } from '@/inventory'
import { GoodsForm } from '@/inventory/GoodsForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType } from '@/types'
import { GoodsRequest, GoodsRequestFailure, GoodsResponse } from '@/types/goods/goods'
import { ImageResponse } from '@/types/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from '../inventory/FloatTrailDetail'

export const GoodDetail = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [goodState, setGoodState] = useState<GoodsRequest>(DefaultGoods)
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
      setGoodState({
        ...goodState,
        image: data,
      })
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const viewResult = useApiCall<CommonListResultType<GoodsResponse>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.goods.getListGoods,
        token: cookies.token,
        params: {
          goodsId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setGoodState({
        ...DefaultGoods,
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

  const updateResult = useApiCall<GoodsRequest, GoodsRequestFailure>({
    callApi: () =>
      putMethod<GoodsRequest>({
        pathName: apiRoute.goods.updateGoods,
        token: cookies.token,
        params: { goodsId: goodState.goodsId },
        request: goodState,
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

  const onchangeGoodsState = (newUpdate: Partial<GoodsRequest>) => {
    const newGoodsState = { ...goodState }
    setGoodState({ ...newGoodsState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')
  const saveLabel = useTranslation('saveLabel')
  const editLabel = useTranslation('edit')

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
    if (viewResult?.data?.result && imageResult?.data?.result) {
      setGoodState({
        ...DefaultGoods,
        ...viewResult.data.result.data[0],
        image: imageResult.data?.result,
      })
    }
    setType('read')
    updateResult.handleReset()
  }

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2>{viewResult.data?.result.data[0].name}</h2>
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
                      router.push('/admin/good/management')
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
        <GoodsForm
          type={type}
          goods={goodState}
          onchangeGoodsState={onchangeGoodsState}
          errorState={updateResult.error?.result}
          selectCategory={goodState.categoryId}
        />
      </div>
    </div>
  )
}
