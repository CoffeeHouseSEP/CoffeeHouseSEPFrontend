import { Checkbox, Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { CategoryRequestFailure, CategoryResponse } from '@/types/category/category'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

interface ICategoryForm {
  category: CategoryResponse
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<CategoryRequestFailure>
}

export const CategoryForm = ({ category, onchangeUserState, type, errorState }: ICategoryForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const nameLabel = useTranslation('name')
  const descriptionLabel = useTranslation('descriptionCate')
  const router = useRouter()

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
          value={category.name}
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
          value={category.description}
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
      {!router.pathname.includes('create') && (
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={category.status === 1}
            onChange={() => {
              onchangeUserState({ status: category.status === 1 ? 0 : 1 })
            }}
          >
            Hoạt động
          </Checkbox>
        </div>
      )}
    </div>
  )
}
