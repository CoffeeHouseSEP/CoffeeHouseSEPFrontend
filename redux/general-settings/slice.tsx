import { GeneralSettingsStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GeneralSettingsStoreTypes = {
  darkTheme: false,
  languageKey: 'en',
}

const GeneralSettingsSlice = createSlice({
  name: 'generalSettings_store',
  initialState,
  reducers: {
    setGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettingsStoreTypes>>) => {
      Object.assign(state, { ...state, ...action.payload })
    },
    resetGeneralSettings: () => initialState,
  },
})

export const { resetGeneralSettings, setGeneralSettings } = GeneralSettingsSlice.actions

export default GeneralSettingsSlice
