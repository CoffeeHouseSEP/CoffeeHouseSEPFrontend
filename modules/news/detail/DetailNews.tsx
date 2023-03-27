import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultNews } from '@/inventory'
import { NewsForm } from '@/inventory/NewsForm'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod, putMethod } from '@/services'
import { CommonListResultType } from '@/types'
import {
  NewsRequest,
  NewsRequestFailure,
  NewsResponse,
  NewsResponseSuccess,
} from '@/types/news/news'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayDetail } from '../inventory/FloatTrailDetail'

export const DetailNews = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])
  const router = useRouter()
  const translate = useTranslationFunction()
  const [type, setType] = useState<'read' | 'update'>('read')
  const [newState, setNewState] = useState<NewsResponse>(DefaultNews)
  const id = router?.query?.id?.toString()
  const { breakPoint } = useSelector(ShareStoreSelector)

  const viewResult = useApiCall<CommonListResultType<NewsResponse>, string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.news.getListNews,
        params: {
          newsId: id ?? '1',
        },
      }),
    handleSuccess: (message, data) => {
      setNewState(data.data[0])
    },
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  const updateResult = useApiCall<NewsRequest, NewsRequestFailure>({
    callApi: () =>
      putMethod<NewsResponse>({
        pathName: apiRoute.news.updateNews,
        token: cookies.token,
        params: { newsId: newState.newsId },
        request: newState,
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

  const onchangeUserState = (newUpdate: Partial<NewsResponseSuccess>) => {
    const newUserState = { ...newState }
    setNewState({ ...newUserState, ...newUpdate })
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
    if (viewResult?.data?.result) setNewState(viewResult.data.result.data[0])
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
                      router.push('/admin/news/management')
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
        <NewsForm
          type={type}
          news={newState}
          onchangeUserState={onchangeUserState}
          errorState={updateResult.error?.result}
        />
      </div>
    </div>
  )
}