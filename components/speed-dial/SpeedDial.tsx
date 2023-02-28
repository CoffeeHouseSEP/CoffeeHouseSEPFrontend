import { addClassBody, removeClassBody } from '@/lib'
import { SpeedDialType } from '@/types'
import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Backdrop } from '../backdrop'
import { Button } from '../button'
import { DropdownBase } from '../dropdown/DropdownBase'

interface ISpeedDial {
  options: SpeedDialType[]
  zIndex?: number
  children?: ReactNode
}

export const SpeedDial = ({ children, options, zIndex }: ISpeedDial) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleOpen = () => {
    addClassBody('overflow')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    removeClassBody('overflow')
  }

  return (
    <>
      <Backdrop onClick={handleClose} isShow={open} zIndex={(zIndex ?? 10) - 1} />

      <div
        onClick={() => {
          if (open) {
            handleClose()
          } else {
            handleOpen()
          }
        }}
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: 'auto',
          height: 'auto',
          overflow: 'hidden',
          zIndex: zIndex ?? 10,
        }}
        ref={divRef}
      >
        <Button style={{ padding: 0, aspectRatio: 1, borderRadius: '100%' }}>
          {children ?? <AiOutlineMenu style={{ width: '50%', height: '50%' }} />}
        </Button>
        <DropdownBase
          zIndex={zIndex}
          refParent={divRef}
          open={open}
          style={{ right: 10, left: undefined }}
        >
          {options.map((item, index) => (
            <div
              style={{
                width: '100%',
                height: 40,
                padding: 10,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onMouseDown={() => {
                if (item.function) {
                  item.function()
                }
                if (item.router) {
                  router.push(item.router)
                }
                handleClose()
              }}
              key={index}
            >
              <Button color={item.color} styleType="light">
                {item.label}
              </Button>
            </div>
          ))}
        </DropdownBase>
      </div>
    </>
  )
}
