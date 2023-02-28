import { useGetDarkMode } from '@/hooks'
import { GeneralSettingsSelector, setGeneralSettings } from '@/redux/general-settings'
import { ShareStoreSelector } from '@/redux/share-store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BackdropLoading } from '../backdrop'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const { loading } = useSelector(ShareStoreSelector)

  const isDark = useGetDarkMode()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isDark) {
      if (darkTheme === 'light') dispatch(setGeneralSettings({ darkTheme: 'dark' }))
    } else if (darkTheme === 'dark') dispatch(setGeneralSettings({ darkTheme: 'light' }))
  }, [isDark])

  return (
    <>
      {children}
      <BackdropLoading isOpen={!!loading} />
    </>
  )
}
