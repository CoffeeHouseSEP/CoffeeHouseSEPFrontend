import { CustomTable, Input, Pagination, UploadFileBase64 } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { themeValue } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, UserResponseSuccess, ViewPointType } from '@/types'
import { BranchRequest, BranchRequestFailure } from '@/types/branch/branch'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SelectDistrict } from './SelectDistrict'
import { SelectProvince } from './SelectProvice'

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

  const result = useApiCall<CommonListResultType<UserResponseSuccess>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.user.getListUser,
        token: cookies.token,
        params: { page: String(page), role: 'BRANCH_MANAGER', status: 1 },
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
  }, [page])

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

  const handleUploadImage = (value: string) => {
    const image = `${value}`
    const imageSplit = image.split('base64,')
    onchangeUserState({
      image: {
        id: 0,
        objectId: '',
        base64: imageSplit[1],
        prefix: `${imageSplit[0]}base64,`,
      },
    })
  }

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
          <SelectProvince
            value={branch.province}
            setValue={(value: string) => {
              onchangeUserState({ province: value })
            }}
            buttonProps={{
              ...inputStyles({
                error: errorState?.province && translate(errorState.province),
              }),
            }}
            type={type}
          />
        </div>
        <SelectDistrict
          valueD={branch.district}
          valueW={branch.ward}
          valueS={branch.street}
          setValueD={(value: string) => {
            onchangeUserState({ district: value })
          }}
          setValueW={(value: string) => {
            onchangeUserState({ ward: value })
          }}
          setValueS={(value: string) => {
            onchangeUserState({ street: value })
          }}
          buttonPropsD={{
            ...inputStyles({
              error: errorState?.district && translate(errorState.district),
            }),
          }}
          buttonPropsW={{
            ...inputStyles({
              error: errorState?.ward && translate(errorState.ward),
            }),
          }}
          buttonPropsS={{
            ...inputStyles({
              error: errorState?.street && translate(errorState.street),
            }),
          }}
          province={branch.province}
          type={type}
        />
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
      </div>
      <div
        style={{
          gridColumn: 'span 1 / span 1',
          display: 'flex',
          gap: 10,
          marginTop: '20px',
          alignItems: 'center',
        }}
      >
        <UploadFileBase64
          handleUploadFile={handleUploadImage}
          labelInput="Upload branch image"
          disabled={type === 'read'}
        />
        {!!branch.image.base64 && (
          <div style={{ height: '50px', aspectRatio: '1', position: 'relative' }}>
            <Image layout="fill" src={`${branch.image.prefix}${branch.image.base64}`} />
          </div>
        )}
      </div>
      <h4 style={{ color: themeValue.dark.colors.redHighland }}>Select manager</h4>
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
      <div style={{ color: themeValue.dark.colors.redHighland, fontWeight: 500, padding: 10 }}>
        {errorState?.branchId}
      </div>
      <div style={{ color: themeValue.dark.colors.redHighland, fontWeight: 500, padding: 10 }}>
        {errorState?.branchManagerId}
      </div>
    </>
  )
}
