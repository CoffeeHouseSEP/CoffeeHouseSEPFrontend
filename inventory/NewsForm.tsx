import { Checkbox, Input, UploadFileBase64 } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { NewsRequest, NewsRequestFailure } from '@/types/news/news'
import Image from 'next/image'
import { useSelector } from 'react-redux'

interface INewForm {
  news: NewsRequest
  onchangeUserState: Function
  type: 'read' | 'update'
  errorState?: Partial<NewsRequestFailure>
}

export const NewsForm = ({ news, onchangeUserState, type, errorState }: INewForm) => {
  const { breakPoint } = useSelector(ShareStoreSelector)
  const translate = useTranslationFunction()

  //   const { darkTheme } = useSelector(GeneralSettingsSelector)

  const titleLabel = useTranslation('title')
  const contentLabel = useTranslation('content')

  const handleUploadImage = (value: string) => {
    const image = `${value}`
    const imageSplit = image.split('base64,')
    onchangeUserState({
      image: {
        id: 0,
        objectId: '',
        base64: imageSplit[1],
        prefix: `${imageSplit[0]}base64,`,
      },
    })
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={news.title}
          label={titleLabel}
          onChange={(event) => {
            onchangeUserState({
              title: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.title && translate(errorState.title),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Input
          readOnly={type === 'read'}
          value={news.content}
          label={contentLabel}
          onChange={(event) => {
            onchangeUserState({
              content: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.content && translate(errorState.content),
          })}
        />
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        <Checkbox
          isReadOnly={type === 'read'}
          isSelected={news.status === 1}
          onChange={() => {
            onchangeUserState({ status: news.status === 1 ? 0 : 1 })
          }}
        >
          {news.status ? 'active' : 'deactivate'}
        </Checkbox>
      </div>
      <div style={{ gridColumn: 'span 1 / span 1', display: 'flex', gap: 10 }}>
        <UploadFileBase64
          handleUploadFile={handleUploadImage}
          labelInput="Upload news image"
          disabled={type === 'read'}
        />
        {!!news.image.base64 && (
          <div style={{ height: '100%', aspectRatio: '1', position: 'relative' }}>
            <Image layout="fill" src={`${news.image.prefix}${news.image.base64}`} />
          </div>
        )}
      </div>
    </div>
  )
}
