import { Button, Input } from '@/components'
import { inputStyles } from '@/inventory'
import { SelectDistrict } from '@/inventory/SelectDistrict'
import { SelectProvince } from '@/inventory/SelectProvice'
import { OrderFailure, OrderRequest } from '@/types/order/order'

export const CartGeneralInfo = ({
  order,
  onChangeOrder,
  error,
}: {
  order: OrderRequest
  onChangeOrder: (value: Partial<OrderRequest>) => void
  error?: Partial<OrderFailure>
}) => {
  return (
    <>
      <h3>Thông tin đặt hàng</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: 30,
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
      <Input
        label="Address"
        value={order.address}
        onChange={(e) => onChangeOrder({ address: e.target.value })}
        {...inputStyles({ error: error?.address })}
      />
      <Input
        label="Description"
        value={order.description}
        onChange={(e) => onChangeOrder({ description: e.target.value })}
        {...inputStyles({ error: error?.description })}
      />
      <Button
        style={{ marginBottom: 10 }}
        onClick={() => {
          onChangeOrder({ ward: '', district: '', province: '', branchId: '' })
        }}
        styleType="light"
      >
        Cancel select address
      </Button>
    </>
  )
}
