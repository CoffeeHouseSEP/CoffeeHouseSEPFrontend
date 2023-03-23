import { ShareStoreTypes } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ShareStoreTypes = {
  loading: 0,
  breakPoint: 1,
  language: {
    CategoryCreatePascal: 'Create category',
    cancel: 'cancel',
    edit: 'edit',
    save: 'save',
    saveLabel: 'Save',
    GoodCreatePascal: 'Create Good',
    name: 'name',
    applyPrice: 'applyPrice',
    innerPrice: 'innerPrice',
    code: 'code',
    description: 'description',
  },
}

const ShareStoreSlice = createSlice({
  name: 'share_store',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      if (actions.payload) {
        return { ...state, loading: state.loading + 1 }
      }
      if (state.loading > 0) {
        return { ...state, loading: state.loading - 1 }
      }
      return state
    },
    setLanguage: (state, actions: PayloadAction<{ [key: string]: string }>) => {
      state.language = actions.payload
    },
    setBreakPoint: (state, actions: PayloadAction<number>) => {
      state.breakPoint = actions.payload
    },
    resetLoading: (state) => {
      return { ...state, loading: 0 }
    },
    resetShareStore: () => initialState,
  },
})

export const { resetShareStore, setLoading, setLanguage, setBreakPoint, resetLoading } =
  ShareStoreSlice.actions

export default ShareStoreSlice
