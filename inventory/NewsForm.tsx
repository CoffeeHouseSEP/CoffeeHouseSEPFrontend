import { Checkbox, Input, UploadFileBase64 } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { themeValue } from '@/lib'
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

  const errorImage = () => {
    const error = errorState?.image as any
    if (!error) return ''
    return error.base64 as React.ReactNode
  }

  return (
    <>
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
          <Checkbox
            isReadOnly={type === 'read'}
            isSelected={news.status === 1}
            onChange={() => {
              onchangeUserState({ status: news.status === 1 ? 0 : 1 })
            }}
          >
            Hoạt động
          </Checkbox>
        </div>
        <div style={{ gridColumn: 'span 1 / span 1', display: 'flex', gap: 10 }}>
          <UploadFileBase64
            handleUploadFile={handleUploadImage}
            labelInput="Tải lên ảnh tin tức"
            disabled={type === 'read'}
          />
          {!!news.image.base64 && (
            <div style={{ height: '100%', aspectRatio: '1', position: 'relative' }}>
              <Image layout="fill" src={`${news.image.prefix}${news.image.base64}`} />
            </div>
          )}
          <div style={{ color: themeValue.dark.colors.redHighland, fontWeight: 500, padding: 10 }}>
            {errorImage()}
          </div>
        </div>
      </div>
      <div
        style={{
          color: themeValue.light.colors.foreground,
          margin: '10px 0px',
        }}
      >
        {contentLabel}
      </div>
      <div>
        <textarea
          style={{ width: '100%', minHeight: 100 }}
          readOnly={type === 'read'}
          value={news.content}
          onChange={(event) => {
            onchangeUserState({
              content: event.currentTarget.value,
            })
          }}
        />
      </div>
      <div
        style={{
          fontSize: '10px',
          paddingLeft: '4px',
          color: themeValue.dark.colors.error,
        }}
      >
        {errorState?.content}
      </div>
    </>
  )
}
