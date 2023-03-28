import { Checkbox, CustomTable, Input, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, UserResponseSuccess, ViewPointType } from '@/types'
import { BranchRequest, BranchRequestFailure } from '@/types/branch/branch'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IBranchForm {
  branch: BranchRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<BranchRequestFailure>
  selectManager?: string
}

export const BranchForm = ({
  branch,
  onchangeUserState,
  type,
  errorState,
  selectManager,
}: IBranchForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const [selectId, setSelectId] = useState<string[]>(selectManager ? [selectManager] : [''])

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const nameLabel = useTranslation('nameBranch')
  const descriptionLabel = useTranslation('descriptionBranch')
  const addressLabel = useTranslation('addressBranch')
  const phoneNumberLabel = useTranslation('phoneNumberBranch')
  const branchManagerIdLabel = useTranslation('branchManagerId')
  const longitudeLabel = useTranslation('longitude')
  const latitudeLabel = useTranslation('latitude')

  const result = useApiCall<CommonListResultType<UserResponseSuccess>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getListUser,
        token: cookies.token,
        params: { page: String(page), role: 'BRANCH_MANAGER' },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })
  const { data, loading, setLetCall } = result

  const dataField: ViewPointType[] = [
    {
      key: 'loginName',
      label: 'loginName',
    },
    {
      key: 'status',
      label: 'status',
    },
  ]

  useEffect(() => {
    setLetCall(true)
  }, [])

  useEffect(() => {
    if (selectId.length) {
      onchangeUserState({
        branchManagerId: selectId[0],
      })
    } else {
      onchangeUserState({
        branchManagerId: '',
      })
    }
  }, [selectId])

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
          gap: 16,
        }}
      >
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.name}
            label={nameLabel}
            onChange={(event) => {
              onchangeUserState({
                name: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.name && translate(errorState.name),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.description}
            label={descriptionLabel}
            onChange={(event) => {
              onchangeUserState({
                description: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.description && translate(errorState.description),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.address}
            label={addressLabel}
            onChange={(event) => {
              onchangeUserState({
                address: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.address && translate(errorState.address),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.phoneNumber}
            label={phoneNumberLabel}
            onChange={(event) => {
              onchangeUserState({
                phoneNumber: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.phoneNumber && translate(errorState.phoneNumber),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.latitude}
            label={longitudeLabel}
            onChange={(event) => {
              onchangeUserState({
                latitude: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.latitude && translate(errorState.latitude),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={branch.longitude}
            label={latitudeLabel}
            onChange={(event) => {
              onchangeUserState({
                longitude: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.longitude && translate(errorState.longitude),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={branch.status === 1}
            onChange={() => {
              onchangeUserState({ status: branch.status === 1 ? 0 : 1 })
            }}
          >
            {branch.status ? 'active' : 'deactivate'}
          </Checkbox>
        </div>
      </div>
      <div style={{ maxWidth: 375, marginTop: 10 }}>
        <Input
          readOnly
          value={branch.branchManagerId}
          label={branchManagerIdLabel}
          onChange={() => {}}
          {...inputStyles({
            error: errorState?.branchManagerId && translate(errorState.branchManagerId),
          })}
        />
      </div>
      <CustomTable
        idFiled="id"
        detailPath="admin/user/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, status: user.status === 1 ? 'active' : 'deactivate' }
              })
            : []
        }
        selectionMode={type === 'read' ? 'none' : 'single'}
        selectedKeys={selectId}
        loading={loading}
        handleChangeSelection={setSelectId}
      >
        <>{null}</>
      </CustomTable>
      {!loading && (
        <Pagination
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
    </>
  )
}
