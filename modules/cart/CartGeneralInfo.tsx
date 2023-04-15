import { Button, CustomTable, Input, Loading, Pagination } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { inputStyles } from '@/inventory'
import { SelectDistrict } from '@/inventory/SelectDistrict'
import { SelectProvince } from '@/inventory/SelectProvice'
import { getMethod } from '@/services'
import { CommonListResultType, ViewPointType } from '@/types'
import { BranchResponse } from '@/types/branch/branch'
import { OrderFailure, OrderRequest } from '@/types/order/order'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { itemStyle } from './ProductCart'

export const CartGeneralInfo = ({
  item,
  order,
  onChangeOrder,
  error,
}: {
  item: { id: string; qty: number; size: 'M' | 'S' | 'L' }[]
  order: OrderRequest
  onChangeOrder: (value: Partial<OrderRequest>) => void
  error?: Partial<OrderFailure>
}) => {
  const [total, setTotal] = useState<
    {
      qty: number
      unitPrice: number
    }[]
  >([])
  const [page, setPage] = useState<number>(1)

  const dataField: ViewPointType[] = [
    {
      key: 'name',
      label: 'nameBranch',
    },
    {
      key: 'phoneNumber',
      label: 'phoneNumberBranch',
    },
    {
      key: 'branchManagerName',
      label: 'branchManagerName',
    },
  ]

  let paramBr = {}

  if (order.province) {
    paramBr = { ...paramBr, province: order.province }
  }

  if (order.district) {
    paramBr = { ...paramBr, district: order.province }
  }

  if (order.ward) {
    paramBr = { ...paramBr, ward: order.ward }
  }

  const resultBranch = useApiCall<CommonListResultType<BranchResponse>, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.branch.getListBranch,
        params: {
          page: String(page),
          pageSize: '10',
          ...paramBr,
        },
      }),
    handleError(status, message) {
      if (status) {
        toast.error(message)
      }
    },
    preventLoadingGlobal: true,
  })
  const { data, setLetCall } = resultBranch
  useEffect(() => {
    if (order.province || order.district || order.ward) {
      setLetCall(true)
    }
  }, [page, order.province, order.district, order.ward])

  const [loading, setLoading] = useState(false)
  const [selectBranch, setSelectBranch] = useState([''])

  const getPrice = async (id: string) => {
    setLoading(true)
    try {
      const res = await getMethod({
        pathName: apiRoute.goods.getListGoods,
        params: {
          page: '1',
          pageSize: '1',
          goodsId: id,
          keySort: 'desc',
          sortField: 'goodsId',
        },
      })
      return res?.data?.result.data[0]?.applyPrice || 0
    } catch (err: any) {
      return 0
    } finally {
      setLoading(false)
    }
  }

  const getSizeUp = async (size: 'S' | 'M' | 'L') => {
    if (size === 'S') return 1
    setLoading(true)
    try {
      const res = await getMethod({
        pathName: apiRoute.appParams.getAppPrams,
        params: {
          parType: 'UPSIZE_GOODS',
        },
      })
      const result = res?.data?.result.data.find((item: any) => item.name === size)
      return result ? parseFloat(result.code) : 1
    } catch (err: any) {
      return 1
    } finally {
      setLoading(false)
    }
  }

  const getTotal = async () => {
    const result = await Promise.all(
      item.map(async (pro) => {
        const priceSize = await getSizeUp(pro.size)
        const unitPrice = await getPrice(pro.id)
        return {
          qty: pro.qty,
          unitPrice: priceSize * unitPrice,
        }
      })
    )
    setTotal(result)
  }

  useEffect(() => {
    if (item.length) getTotal()
  }, [item])

  const getTotalPrice = () => {
    let priceTotal = 0
    for (let i = 0; i < total.length; i += 1) {
      priceTotal += total[i].qty * total[i].unitPrice
    }
    return priceTotal
  }

  useEffect(() => {
    if (selectBranch.length) {
      onChangeOrder({ branchId: selectBranch[0] })
    } else {
      onChangeOrder({ branchId: '' })
    }
  }, [selectBranch])

  return (
    <>
      <h3>Thông tin giỏ hàng</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 4,
        }}
      >
        <SelectProvince
          value={order.province}
          setValue={(value) => {
            onChangeOrder({ province: value })
          }}
          type="update"
          buttonProps={{ ...inputStyles({ error: error?.province }) }}
          preventLoading
        />
        <SelectDistrict
          valueD={order.district}
          setValueD={(value) => {
            onChangeOrder({ district: value })
          }}
          valueW={order.ward}
          setValueW={(value) => {
            onChangeOrder({ ward: value })
          }}
          isNotStreet
          buttonPropsD={{ ...inputStyles({ error: error?.district }) }}
          buttonPropsW={{ ...inputStyles({ error: error?.ward }) }}
          type="update"
          province={order.province}
        />
      </div>
      <Button
        style={{ marginBottom: 10 }}
        onClick={() => onChangeOrder({ ward: '', district: '', province: '' })}
      >
        Cancel select address
      </Button>
      <Input
        label="Address"
        value={order.address}
        onChange={(e) => onChangeOrder({ address: e.target.value })}
        {...inputStyles({ error: error?.address })}
      />
      {order.province && !resultBranch.loading && (
        <>
          <div style={{ marginTop: 10 }}>Branch</div>
          <CustomTable
            selectionMode="single"
            selectedKeys={selectBranch}
            handleChangeSelection={setSelectBranch}
            idFiled="branchId"
            detailPath="admin/branch/"
            header={dataField ?? []}
            body={
              data
                ? data.result.data.map((cate) => {
                    return { ...cate, status: cate.status === 1 ? 'active' : 'deactivate' }
                  })
                : []
            }
            loading={loading}
          >
            <>{null}</>
          </CustomTable>
        </>
      )}
      {resultBranch.loading && <Loading />}
      {order.province && !resultBranch.loading && (
        <Pagination
          pageSize={10}
          total={data?.result?.totalRows ?? 0}
          onChange={(number) => setPage(number)}
          page={page}
          paginationStyle={{ marginTop: 20 }}
        />
      )}
      <div style={{ ...itemStyle, justifyContent: 'start' }}>
        Tổng giá trị đơn hàng:
        <span style={{ marginLeft: 10 }}>
          {loading ? <Loading size={40} /> : <strong>{String(getTotalPrice())} VND</strong>}
        </span>
      </div>
    </>
  )
}
