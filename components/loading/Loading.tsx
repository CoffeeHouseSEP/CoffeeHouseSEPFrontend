import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useSelector } from 'react-redux'

interface ILoading {
  size?: number
  color?: string
}

export const Loading = ({ size = 24, color }: ILoading) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  return (
    <div
      style={{
        width: size,
        height: size,
        padding: '4px',
        position: 'relative',
        display: 'flex',
        borderRadius: '50%',
      }}
    >
      <div
        style={{
          borderRadius: 'inherit',
          borderTop: `${Number(size) / 8}px solid transparent`,
          borderLeft: `${Number(size) / 8}px solid transparent`,
          borderRight: `${Number(size) / 8}px solid transparent`,
          borderBottom: `${Number(size) / 8}px solid ${
            color ?? themeValue[darkTheme].colors.primary
          }`,
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          animation: '0.8s ease 0s infinite normal none running spin',
        }}
      />
      <div
        style={{
          borderRadius: 'inherit',
          borderTop: `${Number(size) / 8}px solid transparent`,
          borderLeft: `${Number(size) / 8}px solid transparent`,
          borderRight: `${Number(size) / 8}px solid transparent`,
          borderBottom: `${Number(size) / 8}px dotted ${
            color ?? themeValue[darkTheme].colors.primary
          }`,
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          animation: '0.8s linear 0s infinite normal none running spin',
          opacity: '50%',
        }}
      />
    </div>
  )
}
