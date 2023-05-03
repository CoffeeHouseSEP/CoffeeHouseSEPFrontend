import { DatePicker, Input } from '@/components'
import { useTranslationFunction } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { CouponRequest, CouponRequestFailure } from '@/types/coupon'
import { useSelector } from 'react-redux'
import { inputStyles } from './Styles'

interface ICategoryForm {
  category: CouponRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<CouponRequestFailure>
}

export const CouponForm = ({ category, onchangeUserState, type, errorState }: ICategoryForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
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
          value={category.code}
          label="Mã giảm giá"
          onChange={(event) => {
            onchangeUserState({
              code: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.code && translate(errorState.code),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <DatePicker
          value={category.expiredDate}
          label="Ngày hết hạn"
          buttonProps={{
            ...inputStyles({
              error: errorState?.expiredDate && translate(errorState?.expiredDate),
            }),
          }}
          onChange={(value: string) => onchangeUserState({ expiredDate: new Date(value) })}
          disable={type === 'read'}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <DatePicker
          value={category.appliedDate}
          label="Ngày áp dụng"
          buttonProps={{
            ...inputStyles({
              error: errorState?.appliedDate && translate(errorState?.appliedDate),
            }),
          }}
          onChange={(value: string) => onchangeUserState({ appliedDate: new Date(value) })}
          disable={type === 'read'}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={category.maxValuePromotion}
          label="Mức áp dụng tối đa"
          onChange={(event) => {
            if (Number.isFinite(Number(event.target.value))) {
              onchangeUserState({
                maxValuePromotion: Number(event.currentTarget.value),
              })
            }
          }}
          {...inputStyles({
            error: errorState?.maxValuePromotion && translate(errorState.maxValuePromotion),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={category.value}
          label="Phần trăm áp dụng"
          onChange={(event) => {
            if (Number.isFinite(Number(event.target.value)) && Number(event.target.value) <= 100) {
              onchangeUserState({
                value: Number(event.currentTarget.value),
              })
            }
          }}
          {...inputStyles({
            error: errorState?.value && translate(errorState.value),
          })}
        />
      </div>
    </div>
  )
}
