import { GeneralSettingsStoreTypes, ShareStoreTypes } from '@/types'
import { configureStore } from '@reduxjs/toolkit'
import GeneralSettingsSlice from './general-settings/slice'
import ShareStoreSlice from './share-store/slice'

const store = configureStore({
  reducer: {
    generalSettings: GeneralSettingsSlice.reducer,
    shareStore: ShareStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type RootState = {
  generalSettings: GeneralSettingsStoreTypes
  shareStore: ShareStoreTypes
}
