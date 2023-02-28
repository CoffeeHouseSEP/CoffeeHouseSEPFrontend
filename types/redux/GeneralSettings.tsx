import { ThemeKey } from '@/lib'
import { UserResponseSuccess } from '../user'

export type GeneralSettingsStoreTypes = {
  darkTheme: ThemeKey
  languageKey: string
  accountInfo: UserResponseSuccess
}
