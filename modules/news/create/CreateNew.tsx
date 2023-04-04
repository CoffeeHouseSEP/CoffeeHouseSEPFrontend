import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultNews } from '@/inventory'
import { NewsForm } from '@/inventory/NewsForm'

import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { NewsRequest, NewsRequestFailure } from '@/types/news/news'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from '../inventory/FloatTrailCreate'

export default function NewCreate() {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const [newState, setNewState] = useState<NewsRequest>(DefaultNews)

  const createResult = useApiCall<NewsRequest, NewsRequestFailure>({
    callApi: () =>
      postMethod<NewsRequest>({
        pathName: apiRoute.news.createNews,
        token: cookies.token,
        request: newState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/news/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<NewsRequest>) => {
    const newUserState = { ...newState }
    setNewState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/news/management')
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
        <NewsForm
          type="update"
          news={newState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
