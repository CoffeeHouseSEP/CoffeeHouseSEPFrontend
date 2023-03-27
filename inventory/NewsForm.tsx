import { Checkbox, Input } from '@/components'
import { useTranslation, useTranslationFunction } from '@/hooks'
import { inputStyles } from '@/inventory'
import { ShareStoreSelector } from '@/redux/share-store'
import { NewsRequest, NewsRequestFailure } from '@/types/news/news'
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
  const createByLabel = useTranslation('createBy')

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
        <Input
          readOnly={type === 'read'}
          value={news.createdBy}
          label={createByLabel}
          onChange={(event) => {
            onchangeUserState({
              createdBy: event.currentTarget.value,
            })
          }}
          {...inputStyles({
            error: errorState?.createdBy && translate(errorState.createdBy),
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
    </div>
  )
}
