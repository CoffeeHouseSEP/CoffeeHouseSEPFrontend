import Image from 'next/image'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface ISlider {
  ItemCard: ReactNode[]
  numberDisplay: number
  dot?: boolean
  step?: number
  timeOutPlay?: number
}

export const CustomSlider = ({
  ItemCard,
  numberDisplay,
  dot = true,
  step = 1,
  timeOutPlay = 4000,
}: ISlider) => {
  const [index, setIndex] = useState(0)
  const [widthCard, setWidthCard] = useState(0)
  const refAvatar = useRef<HTMLDivElement>(null)
  const refCard = useRef<HTMLDivElement>(null)

  const getTranslate = () => {
    if (refAvatar?.current?.offsetWidth) {
      if (
        (ItemCard.length - numberDisplay) * refAvatar.current.offsetWidth <
        index * refAvatar.current.offsetWidth
      ) {
        return -(ItemCard.length - numberDisplay) * refAvatar.current.offsetWidth
      }
      return -index * refAvatar.current.offsetWidth
    }
    return 0
  }

  useEffect(() => {
    setWidthCard((refCard?.current?.offsetWidth ?? 0) / numberDisplay)
  }, [refAvatar, refCard])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < ItemCard.length - numberDisplay) {
        setIndex((prev) => prev + step)
        clearTimeout(timeout)
      }
    }, timeOutPlay)
    return () => {
      clearTimeout(timeout)
    }
  }, [index])
  return (
    <div
      className="hide-scrollbar"
      style={{
        width: '100%',
        overflowX: 'hidden',
        position: 'relative',
      }}
      ref={refCard}
    >
      <div
        onClick={() => {
          if (index > step - 1) {
            setIndex((prev) => prev - step)
          }
        }}
        style={{
          position: 'absolute',
          left: 0,
          bottom: '50%',
          transform: 'translateY(50%)',
          borderRadius: '100%',
          zIndex: 5,
          cursor: index > 0 ? 'pointer' : 'default',
          opacity: index > 0 ? 1 : 0.5,
          width: 30,
          height: 30,
        }}
      >
        <Image src="/asset/arrow-left.svg" alt="" layout="fill" />
      </div>

      <div
        style={{
          transform: `translateX(${getTranslate()}px)`,
          display: 'flex',
          WebkitTransition: '2s ease-out',
          MozTransition: '2s ease-out',
          OTransition: '2s ease-out',
          transition: '2s ease-out',
          gap: 20,
          marginBottom: 10,
          height: '100%',
          width: 'min-content',
        }}
      >
        {ItemCard.map((item, index) => {
          return (
            <div
              key={index}
              ref={refAvatar}
              style={{
                width: `${widthCard}px`,
              }}
            >
              {item}
            </div>
          )
        })}
      </div>

      <div
        onClick={() => {
          if (index < ItemCard.length - numberDisplay) {
            setIndex((prev) => prev + step)
          }
        }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: '50%',
          transform: 'translateY(50%)',
          borderRadius: '100%',
          display: 'flex',

          zIndex: 5,
          cursor: index < ItemCard.length - numberDisplay ? 'pointer' : 'default',
          opacity: index < ItemCard.length - numberDisplay ? 1 : 0.5,
          width: 30,
          height: 30,
        }}
      >
        <Image src="/asset/arrow-right.svg" alt="" layout="fill" />
      </div>

      {dot ? (
        <div
          style={{
            position: 'absolute',
            right: '50%',
            bottom: '30px',
            transform: 'translateX(50%)',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '100px',
            zIndex: 5,
            color: 'white',
            gap: 10,
          }}
        >
          {new Array(Math.ceil((ItemCard.length - numberDisplay) / step + 1))
            .fill(null)
            .map((item, index1) => {
              return (
                <div
                  key={index1}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '100%',
                    backgroundColor: 'white',
                    opacity: index1 * step === index ? '100%' : '50%',
                    scale: index1 * step === index ? '160%' : '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIndex(index1 * step)}
                />
              )
            })}
        </div>
      ) : null}
    </div>
  )
}
