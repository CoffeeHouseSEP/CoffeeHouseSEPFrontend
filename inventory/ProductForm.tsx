import { Checkbox, Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import InputCategoryFile from '@/modules/goods/inventory/InputCategoryFile'
import { ShareStoreSelector } from '@/redux/share-store'
import { GoodRequestFailure, GoodResponse } from '@/types/goods/goods'
import { useSelector } from 'react-redux'

interface IGoodForm {
  good: GoodResponse
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<GoodRequestFailure>
}

export const GoodForm = ({ good, onchangeUserState, type, errorState }: IGoodForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)
  //   const genderLabel = useTranslation('genderLabel')
  const categoryName = useTranslation('categoryId')
  const applyPrice = useTranslation('applyPrice')
  const innerPrice = useTranslation('innerPrice')
  const codeLabel = useTranslation('code')
  const nameLabel = useTranslation('name')
  const descriptionLabel = useTranslation('description')

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
          value={good.name}
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
          value={good.innerPrice}
          label={innerPrice}
          onChange={(event) => {
            onchangeUserState({
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
          value={good.categoryId}
          label={categoryName}
          onChange={(event) => {
            onchangeUserState({
              categoryId: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.categoryId && translate(errorState.categoryId),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={good.applyPrice}
          label={applyPrice}
          onChange={(event) => {
            onchangeUserState({
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
          value={good.code}
          label={codeLabel}
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
        <Input
          readOnly={type === 'read'}
          value={good.description}
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
        <InputCategoryFile />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Checkbox
          isReadOnly={type === 'read'}
          isSelected={good.status === 1}
          onChange={() => {
            onchangeUserState({ status: good.status === 1 ? 0 : 1 })
          }}
        >
          {good.status ? 'active' : 'deactivate'}
        </Checkbox>
      </div>
    </div>
  )
}
