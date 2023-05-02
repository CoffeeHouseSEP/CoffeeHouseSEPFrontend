import { Checkbox, CustomTable, Input, Pagination, UploadFileBase64 } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { themeValue } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { CommonListResultType, UserResponseSuccess, ViewPointType } from '@/types'
import { GoodsRequest, GoodsRequestFailure } from '@/types/goods/goods'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
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
  const goodsUnitLabel = useTranslation('goodsUnit')

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

  const thisImage = useMemo(() => {
    return goods.image.base64 ? (
      <div style={{ height: '40px', aspectRatio: '1 / 1', position: 'relative' }}>
        <Image layout="fill" src={`${goods.image.prefix}${goods.image.base64}`} />
      </div>
    ) : (
      <div style={{ color: themeValue.dark.colors.redHighland }}>
        {errorState && errorState['base64' as keyof typeof errorState]
          ? errorState['base64' as keyof typeof errorState]
          : 'Không có ảnh'}
      </div>
    )
  }, [goods])

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
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={goods.isSize === 1}
            onChange={() => {
              onchangeGoodsState({ isSize: goods.isSize === 1 ? 0 : 1 })
            }}
          >
            Có kích cỡ
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
            Có thể giao dịch
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
            Có sẵn
          </Checkbox>
        </div>
      </div>
      <div
        style={{
          width: 'max-content',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: '20px',
        }}
      >
        <UploadFileBase64
          handleUploadFile={handleUploadImage}
          labelInput="Tải ảnh sản phẩm"
          disabled={type === 'read'}
        />
        {thisImage}
      </div>
      <h4 style={{ color: themeValue.dark.colors.redHighland }}>Chọn danh mục</h4>
      <CustomTable
        idFiled="categoryId"
        detailPath="admin/category/"
        header={dataField ?? []}
        body={
          data
            ? data.result.data.map((user) => {
                return { ...user, status: user.status === 1 ? 'Hoạt động' : 'Không hoạt động' }
              })
            : []
        }
        selectionMode={type === 'read' ? 'none' : 'single'}
        selectedKeys={selectId}
        loading={loading}
        handleChangeSelection={setSelectId}
        listActions={[]}
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
