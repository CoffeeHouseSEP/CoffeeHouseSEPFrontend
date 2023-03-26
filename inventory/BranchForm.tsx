import { Checkbox, Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { BranchRequest, BranchRequestFailure } from '@/types/branch/branch'
import { useSelector } from 'react-redux'

interface IBranchForm {
  branch: BranchRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<BranchRequestFailure>
}

export const BranchForm = ({ branch, onchangeUserState, type, errorState }: IBranchForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const nameLabel = useTranslation('name')
  const descriptionLabel = useTranslation('description')
  const addressLabel = useTranslation('address')
  const phoneNumberLabel = useTranslation('phoneNumber')
  const branchManagerIdLabel = useTranslation('branchManagerId')
  const longitudeLabel = useTranslation('longitude')
  const latitudeLabel = useTranslation('latitude')

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
        <Input
          readOnly={type === 'read'}
          value={branch.branchManagerId}
          label={branchManagerIdLabel}
          onChange={(event) => {
            onchangeUserState({
              branchManagerId: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.branchManagerId && translate(errorState.branchManagerId),
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
  )
}
