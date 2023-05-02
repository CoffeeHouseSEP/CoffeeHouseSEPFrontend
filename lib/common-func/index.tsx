import { OptionsType, ViewPointType } from '@/types'
import Image from 'next/image'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { GenderList } from '../common-value'

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64')
}

export const encodeBase64Url = (data: string) => {
  return Buffer.from(data).toString('base64url')
}

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii')
}
const jwt = require('jsonwebtoken')

export const generateToken = (content: { userId: string; deviceId: string }) => {
  const contentJwt = {
    ...content,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000 + 60 * 60),
  }

  const token = jwt.sign(contentJwt, process.env.NEXT_PUBLIC_SECRET_JWT_KEY || '', {
    algorithm: 'HS512',
  })

  return `Bearer ${token}`
}

export const convertValueToLabel = <T,>(value: T, list: OptionsType<T>[]) => {
  return list.find((item) => item.value === value)?.label ?? ''
}

export const lostOddProps = <T extends {}>(source: Partial<T>, editable: ViewPointType[] = []) => {
  let target: Partial<T> = {}
  editable.forEach((key) => {
    if (source?.[key.key as keyof T] !== undefined) {
      target = { ...target, [key.key as keyof T]: source[key.key as keyof T] }
    }
  })

  return target
}

export const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
})

export const getListEditAble = (editable: ViewPointType[] = []) => {
  let listReturn = {}
  editable.forEach((key) => {
    listReturn = { ...listReturn, [key.key]: true }
  })
  return listReturn
}

export const addClassBody = (className: string) => {
  if (typeof window !== undefined) {
    document.body.classList.add(className)
  }
}

export const removeClassBody = (className: string) => {
  if (typeof window !== undefined) {
    document.body.classList.remove(className)
  }
}

export const ParseValueForTable = (): object & any => {
  const genderList = GenderList()

  return {
    avatar: (value: string) => {
      return (
        <div style={{ width: '40px', aspectRatio: '1 / 1', position: 'relative' }}>
          <Image layout="fill" src={value} />
        </div>
      )
    },
    totalPrice: (value: number) => {
      return VND.format(Math.round(value))
    },
    status: (value: string) => {
      if (typeof value === 'string') {
        let status = <>no content</>
        switch (value) {
          case 'PENDING_APPROVED':
            status = <div style={{ color: 'orange' }}>CHỜ XÁC NHẬN</div>
            break
          case 'PENDING':
            status = <div style={{ color: 'orange' }}>CHỜ XÁC NHẬN</div>
            break
          case 'APPROVED':
            status = <div style={{ color: 'green' }}>XÁC NHẬN</div>
            break
          case 'CANCELLED':
            status = <div style={{ color: 'red' }}>ĐÃ HỦY</div>
            break
          case 'CREATED':
            status = <div style={{ color: 'green' }}>ĐÃ TẠO</div>
            break
          case 'COMPLETED':
            status = <div style={{ color: 'green' }}>ĐÃ HOÀN THÀNH</div>
            break
          default:
            status = <>{value}</>
        }
        return status
      }
      return value
    },
    active: (value: number) => {
      if (value) return <AiOutlineCloseCircle color="red" />
      return <AiOutlineCheckCircle color="green" />
    },
    verified: (value: boolean) => {
      if (value) return <AiOutlineCheckCircle color="green" />
      return <AiOutlineCloseCircle color="red" />
    },
    verify2FA: (value: boolean) => {
      if (value) return <AiOutlineCheckCircle color="green" />
      return <AiOutlineCloseCircle color="red" />
    },
    gender: (value: number) => {
      return convertValueToLabel(value, genderList)
    },
    isDisabled: (value: number) => {
      if (value) return <AiOutlineCloseCircle color="red" />
      return <AiOutlineCheckCircle color="green" />
    },
  }
}

export const addToCartHandler = (qty: number, size: 'M' | 'S' | 'L', id?: string) => {
  if (!id) return
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const productList: {
        id: string
        qty: number
        size: string
      }[] = JSON.parse(cart)
      const findItem = productList.find((item) => item.id === id && item.size === size)
      if (findItem) {
        localStorage.setItem(
          'cart',
          JSON.stringify(
            productList.map((item) => {
              if (item.id === id && item.size === size) {
                return {
                  ...item,
                  qty: qty + item.qty,
                }
              }
              return item
            })
          )
        )
      } else {
        localStorage.setItem(
          'cart',
          JSON.stringify([
            ...productList,
            {
              id,
              qty,
              size,
            },
          ])
        )
      }
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          {
            id,
            qty,
            size,
          },
        ])
      )
    }
  }
}
export const formatDate = (yourDate: Date) => {
  const d = new Date(yourDate)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}
