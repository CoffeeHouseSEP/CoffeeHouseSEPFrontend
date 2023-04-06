import Image from 'next/image'
import { useRouter } from 'next/router'
import { CSSProperties, ReactNode, useState } from 'react'
import {
  initDesCriptionStyle,
  initImageStyle,
  initSubTitleStyle,
  initTitleStyle,
  initWrapperStyle,
  StringCardType,
} from './inventory'

interface ICardBase {
  wrapperStyle?: CSSProperties
  hoveredStyle?: CSSProperties
  image?: StringCardType
  title?: StringCardType
  subTitle?: StringCardType
  description?: StringCardType
  child?: ReactNode
  Link?: string
}

export const CardBase = ({
  wrapperStyle,
  image,
  title,
  subTitle,
  description,
  child,
  Link,
  hoveredStyle,
}: ICardBase) => {
  const router = useRouter()
  const [hoverImage, setHoverImage] = useState(false)
  const [hoverCard, setHoverCard] = useState(false)
  const [hoverTitle, setHoverTitle] = useState(false)

  const handleClickCard = () => {
    if (Link) {
      router.push(Link)
    }
  }

  const handleClickImage = () => {
    if (image?.Link) {
      router.push(image.Link)
    }
  }

  const handleClickTitle = () => {
    if (title?.Link) {
      router.push(title.Link)
    }
  }

  const handleClickSubTitle = () => {
    if (subTitle?.Link) {
      router.push(subTitle.Link)
    }
  }

  const returnPsedo = (isTrue: boolean, hover?: CSSProperties): CSSProperties => {
    if (isTrue && hover) return hover
    return {}
  }

  return (
    <div
      onMouseEnter={() => {
        setHoverCard(true)
      }}
      onMouseLeave={() => {
        setHoverCard(false)
      }}
      onClick={handleClickCard}
      style={{
        ...initWrapperStyle,
        cursor: Link ? 'pointer' : 'default',
        ...wrapperStyle,
        ...returnPsedo(hoverCard, hoveredStyle),
      }}
    >
      {image ? (
        <div
          onMouseEnter={() => {
            setHoverImage(true)
          }}
          onMouseLeave={() => {
            setHoverImage(false)
          }}
          onClick={handleClickImage}
          style={{
            ...initImageStyle,
            ...image.style,
            ...returnPsedo(hoverImage, image.hoveredStyle),
          }}
        >
          <Image src={image.content} layout="fill" />
          {image?.child}
        </div>
      ) : null}
      {title ? (
        <div
          onMouseEnter={() => {
            setHoverTitle(true)
          }}
          onMouseLeave={() => {
            setHoverTitle(false)
          }}
          onClick={handleClickTitle}
          style={{
            ...initTitleStyle,
            ...title.style,
            ...returnPsedo(hoverTitle, title.hoveredStyle),
          }}
        >
          {title.content}
        </div>
      ) : null}
      {subTitle ? (
        <div onClick={handleClickSubTitle} style={{ ...initSubTitleStyle, ...subTitle.style }}>
          {subTitle.content}
        </div>
      ) : null}
      {description ? (
        <div style={{ ...initDesCriptionStyle, ...description.style }}>
          Giá :{description.content} $
        </div>
      ) : null}
      {child}
    </div>
  )
}
