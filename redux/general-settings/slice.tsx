import { GeneralSettingsStoreTypes, UserResponseSuccess } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GeneralSettingsStoreTypes = {
  darkTheme: 'dark',
  languageKey: 'en',
  accountInfo: {
    loginName: '',
    phoneNumber: '',
    status: 0,
    id: '',
    createdDate: '',
  },
}

const GeneralSettingsSlice = createSlice({
  name: 'generalSettings_store',
  initialState,
  reducers: {
    setGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettingsStoreTypes>>) => {
      Object.assign(state, { ...state, ...action.payload })
    },
    setUserInfo: (state, action: PayloadAction<UserResponseSuccess>) => {
      Object.assign(state, { ...state, accountInfo: { ...state.accountInfo, ...action.payload } })
    },
    resetGeneralSettings: () => initialState,
  },
})

export const { resetGeneralSettings, setGeneralSettings, setUserInfo } =
  GeneralSettingsSlice.actions

export default GeneralSettingsSlice
