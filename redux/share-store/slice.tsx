import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  settingsLoading: false,
  languageLoading: false,
  breakPoint: 1,
  language: {},
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoadingSettings: (state, actions: PayloadAction<boolean>) => {
      state.settingsLoading = actions.payload
    },
    setLoadingLanguage: (state, actions: PayloadAction<boolean>) => {
      state.languageLoading = actions.payload
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    setBreakPoint: (state, actions: PayloadAction<number>) => {
      state.breakPoint = actions.payload
    },
    resetShareStore: () => initialState,
  },
})

export const {
  resetShareStore,
  setLoadingSettings,
  setLoadingLanguage,
  setLanguage,
  setBreakPoint,
} = ShareStoreSlice.actions

export default ShareStoreSlice
