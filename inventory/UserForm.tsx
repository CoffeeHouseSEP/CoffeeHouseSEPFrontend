import { DatePicker, Input, SelectCustom } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { GenderList, themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { UserDetailFailure, UserResponseSuccess } from '@/types'
import Image from 'next/image'
import { useSelector } from 'react-redux'

interface IUserForm {
  user: UserResponseSuccess
  onchangeUserState: Function
  errorState?: Partial<UserDetailFailure>
  editAble?: Partial<Record<keyof UserResponseSuccess, boolean>>
}

export const UserForm = ({ user, onchangeUserState, errorState, editAble }: IUserForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const usernameLabel = useTranslation('username')
  const modifiedLabel = useTranslation('modified')
  const createLabel = useTranslation('created')
  const addressLabel = useTranslation('address')
  const firstNameLabel = useTranslation('firstName')
  const lastNameLabel = useTranslation('lastName')
  const dobLabel = useTranslation('dob')
  const genderLabel = useTranslation('gender')
  const phoneLabel = useTranslation('phone')
  const emailLabel = useTranslation('email')
  const verifiedLabel = useTranslation('verified')

  const genderList = GenderList()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      <div
        style={{
          gridColumn: 'span 1 / span 1',
          backgroundColor: user.verified
            ? themeValue[darkTheme].colors.success
            : themeValue[darkTheme].colors.warning,
          verticalAlign: 'middle',
          borderRadius: '14px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          height: 62,
          justifyContent: 'space-between',
        }}
      >
        {verifiedLabel.toUpperCase()}
        <div style={{ height: '100%', position: 'relative', aspectRatio: '1 / 1' }}>
          <Image src={user.avatar} layout="fill" />
        </div>
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.created}
          label={createLabel}
          readOnly={!editAble?.created}
          {...inputStyles({
            error: errorState?.created && translate(errorState.created),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.modified}
          label={modifiedLabel}
          readOnly={!editAble?.modified}
          {...inputStyles({
            error: errorState?.modified && translate(errorState.modified),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.username}
          label={usernameLabel}
          readOnly={!editAble?.username}
          onChange={(event) => {
            onchangeUserState({
              username: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.username && translate(errorState.username),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.address}
          label={addressLabel}
          readOnly={!editAble?.address}
          onChange={(event) => {
            onchangeUserState({
              address: event.currentTarget.value,
            })
          }}
          {...inputStyles({ error: errorState?.address && translate(errorState.address) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.firstName}
          label={firstNameLabel}
          readOnly={!editAble?.firstName}
          onChange={(event) => {
            onchangeUserState({
              firstName: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.firstName && translate(errorState.firstName),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.lastName}
          label={lastNameLabel}
          readOnly={!editAble?.lastName}
          onChange={(event) => {
            onchangeUserState({
              lastName: event.currentTarget.value,
            })
          }}
          {...inputStyles({ error: errorState?.lastName && translate(errorState.lastName) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <DatePicker
          value={user.dob}
          label={dobLabel}
          onChange={(event: string) => {
            onchangeUserState({
              dob: event,
            })
          }}
          buttonProps={inputStyles({
            error: errorState?.dob && translate(errorState.dob),
          })}
          disable={!editAble?.dob}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <SelectCustom<number>
          value={user.gender}
          onChange={(value) => {
            onchangeUserState({
              gender: value,
            })
          }}
          label={genderLabel}
          disabled={!editAble?.gender}
          options={genderList}
          buttonProps={{
            ...inputStyles({
              error: errorState?.gender && translate(errorState.gender),
            }),
            width: '100%',
          }}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.phone}
          label={phoneLabel}
          readOnly={!editAble?.phone}
          onChange={(event) => {
            onchangeUserState({
              phone: event.currentTarget.value,
            })
          }}
          {...inputStyles({ error: errorState?.phone && translate(errorState.phone) })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          value={user.email}
          label={emailLabel}
          readOnly={!editAble?.email}
          onChange={(event) => {
            onchangeUserState({
              email: event.currentTarget.value,
            })
          }}
          {...inputStyles({ error: errorState?.email && translate(errorState.email) })}
        />
      </div>
    </div>
  )
}
