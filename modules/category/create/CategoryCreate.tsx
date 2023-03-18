import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useGetBreadCrumb, useTranslation, useTranslationFunction } from '@/hooks'
import { CategoryRequestDefault } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { CategoryRequest, CategoryRequestFailure } from '@/types/category'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FloatTrayCreate } from '../inventory/FloatTrayCreate'

export default function CategoryCreate() {
  const router = useRouter()
  const translate = useTranslationFunction()
  const [categoryState] = useState<CategoryRequest>(CategoryRequestDefault)
  const createResult = useApiCall<CategoryRequest, CategoryRequestFailure>({
    callApi: () =>
      postMethod({
        pathName: apiRoute.category.addCategory,
        request: categoryState,
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/category/management')
    },
  })
  const breadCrumb = useGetBreadCrumb()

  // const handleChangeState = (NewUpdate: Partial<CategoryRequest>) => {
  //   const newState = { ...categoryState, ...NewUpdate }
  //   setCategoryState(newState)
  // }
  const { breakPoint } = useSelector(ShareStoreSelector)

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const callCreate = () => {
    createResult.setLetCall(true)
  }

  const directManagement = () => {
    router.push('/category/management')
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
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          {breakPoint > 1 ? (
            <>
              <Button color="primary" onClick={callCreate} disabled={createResult.loading}>
                {createResult.loading ? <Loading /> : <>{saveLabel}</>}
              </Button>
              <Button color="warning" onClick={directManagement} disabled={createResult.loading}>
                {cancelLabel}
              </Button>
            </>
          ) : (
            <FloatTrayCreate callCreate={callCreate} directManagement={directManagement} />
          )}
        </div>
      </div>
      {/* <ModifierPermission
        editAble={getListEditAble([
          { key: 'name', label: 'name' },
          { key: 'userId', label: 'userId' },
          { key: 'viewPoints', label: 'viewPoints' },
          { key: 'editable', label: 'editable' },
          { key: 'isServer', label: 'isServer' },
        ])}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      /> */}
    </div>
  )
}
