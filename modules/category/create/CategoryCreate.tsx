import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { DefaultCategory } from '@/inventory'
import { CategoryForm } from '@/inventory/CategoryForm'

import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import {
  CategoryRequest,
  CategoryRequestFailure,
  CategoryResponse,
} from '@/types/category/category'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function CategoryCreate() {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const router = useRouter()
  const translate = useTranslationFunction()

  const { breakPoint } = useSelector(ShareStoreSelector)

  const breadCrumb = useGetBreadCrumb()

  const [categoryState, setCategoryState] = useState<CategoryResponse>(DefaultCategory)

  const createResult = useApiCall<CategoryRequest, CategoryRequestFailure>({
    callApi: () =>
      postMethod<CategoryRequest>({
        pathName: apiRoute.category.createCategory,
        token: cookies.token,
        request: categoryState,
      }),
    handleError(status, message) {
      if (status !== 400) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/admin/category/management')
    },
  })

  const onchangeUserState = (newUpdate: Partial<CategoryRequest>) => {
    const newUserState = { ...categoryState }
    setCategoryState({ ...newUserState, ...newUpdate })
  }

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/admin/category/management')
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
        <CategoryForm
          type="update"
          category={categoryState}
          onchangeUserState={onchangeUserState}
          errorState={createResult.error?.result}
        />
      </div>
    </div>
  )
}
