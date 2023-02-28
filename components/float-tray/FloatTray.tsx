import { SpeedDialType } from '@/types'
import { useRouter } from 'next/router'
import { Button } from '../button'

interface IFloatTray {
  buttonList: SpeedDialType[]
}

export const FloatTray = ({ buttonList }: IFloatTray) => {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        gap: 10,
        zIndex: 4,
      }}
    >
      {buttonList.map((button, index) => (
        <Button
          onClick={() => {
            if (button.function) {
              button.function()
            }
            if (button.router) {
              router.push(button.router)
            }
          }}
          color={button.color}
          style={{
            borderRadius: '100%',
            padding: 0,
            aspectRatio: '1',
            minHeight: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={index}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}
