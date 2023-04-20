import { Checkbox, CustomTable, Input, Pagination, UploadFileBase64 } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, UserResponseSuccess, ViewPointType } from '@/types'
import { GoodsRequest, GoodsRequestFailure } from '@/types/goods/goods'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface IGoodsForm {
  goods: GoodsRequest
  onchangeGoodsState: Function
  type: 'read' | 'update'
  errorState?: Partial<GoodsRequestFailure>
  selectCategory?: string
}

export const GoodsForm = ({
  goods,
  onchangeGoodsState,
  type,
  errorState,
  selectCategory,
}: IGoodsForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const [page, setPage] = useState<number>(1)
  const [selectId, setSelectId] = useState<string[]>(selectCategory ? [selectCategory] : [''])

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const nameLabel = useTranslation('nameGoods')
  const codeLabel = useTranslation('code')
  const applyPriceLabel = useTranslation('applyPrice')
  const innerPriceLabel = useTranslation('innerPrice')
  const descriptionLabel = useTranslation('description')
  const isSizeLabel = useTranslation('isSize')
  const goodsUnitLabel = useTranslation('goodsUnit')
  const categoryIdLabel = useTranslation('categoryId')

  const result = useApiCall<CommonListResultType<UserResponseSuccess>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.category.getListCategory,
        token: cookies.token,
        params: { page: String(page) },
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
      key: 'name',
      label: 'name',
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
      onchangeGoodsState({
        categoryId: selectId[0],
      })
    } else {
      onchangeGoodsState({
        categoryId: '',
      })
    }
  }, [selectId])

  const handleUploadImage = (value: string) => {
    const image = `${value}`
    const imageSplit = image.split('base64,')
    onchangeGoodsState({
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
            value={goods.name}
            label={nameLabel}
            onChange={(event) => {
              onchangeGoodsState({
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
            value={goods.description}
            label={descriptionLabel}
            onChange={(event) => {
              onchangeGoodsState({
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
            value={goods.code}
            label={codeLabel}
            onChange={(event) => {
              onchangeGoodsState({
                code: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.code && translate(errorState.code),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={goods.goodsUnit}
            label={goodsUnitLabel}
            onChange={(event) => {
              onchangeGoodsState({
                goodsUnit: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.goodsUnit && translate(errorState.goodsUnit),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={goods.innerPrice}
            label={innerPriceLabel}
            onChange={(event) => {
              onchangeGoodsState({
                innerPrice: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.innerPrice && translate(errorState.innerPrice),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={goods.applyPrice}
            label={applyPriceLabel}
            onChange={(event) => {
              onchangeGoodsState({
                applyPrice: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.applyPrice && translate(errorState.applyPrice),
            })}
          />
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Input
            readOnly={type === 'read'}
            value={goods.isSize}
            label={isSizeLabel}
            onChange={(event) => {
              onchangeGoodsState({
                isSize: event.currentTarget.value,
              })
            }}
            {...inputStyles({
              error: errorState?.isSize && translate(errorState.isSize),
            })}
          />
        </div>

        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={goods.status === 1}
            onChange={() => {
              onchangeGoodsState({ status: goods.status === 1 ? 0 : 1 })
            }}
          >
            active
          </Checkbox>
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={goods.isTransfer === 1}
            onChange={() => {
              onchangeGoodsState({ isTransfer: goods.isTransfer === 1 ? 0 : 1 })
            }}
          >
            transfer
          </Checkbox>
        </div>
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={goods.isSold === 1}
            onChange={() => {
              onchangeGoodsState({ isSold: goods.isSold === 1 ? 0 : 1 })
            }}
          >
            available
          </Checkbox>
        </div>
        <div style={{ gridColumn: 'span 1 / span 1', display: 'flex', gap: 10 }}>
          <UploadFileBase64
            handleUploadFile={handleUploadImage}
            labelInput="Upload goods image"
            disabled={type === 'read'}
          />
          {!!goods.image.base64 && (
            <div style={{ height: '100%', aspectRatio: '1', position: 'relative' }}>
              <Image layout="fill" src={`${goods.image.prefix}${goods.image.base64}`} />
            </div>
          )}
        </div>
      </div>
      <div style={{ maxWidth: 375, margin: `10px 0px` }}>
        <Input
          readOnly
          value={goods.categoryId}
          label={categoryIdLabel}
          onChange={() => {}}
          {...inputStyles({
            error: errorState?.categoryId && translate(errorState.categoryId),
          })}
        />
      </div>
      <CustomTable
        idFiled="categoryId"
        detailPath="admin/category/"
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
