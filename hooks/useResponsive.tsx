import { setBreakPoint } from '@/redux/share-store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useResponsive = () => {
  const [pixel, setPixel] = useState<number>(1)

  const dispatch = useDispatch()

  useEffect(() => {
    const getWidth = () => {
      setPixel(window.innerWidth)
      if (window.innerWidth <= 960) {
        dispatch(setBreakPoint(1))
        return
      }
      if (window.innerWidth <= 1280) {
        dispatch(setBreakPoint(2))
        return
      }
      dispatch(setBreakPoint(3))
    }

    getWidth()

    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [])

  return pixel
}
