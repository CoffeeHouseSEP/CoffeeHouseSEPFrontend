import { Button } from '@/components/button'
import { useTranslation } from '@/hooks'
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

interface IUploadFile extends InputHTMLAttributes<HTMLInputElement> {
  handleUploadFile: Function
  labelInput: string
}

export const UploadFileBase64 = ({
  handleUploadFile,
  labelInput,
  disabled,
  ...rest
}: IUploadFile) => {
  const [error, setError] = useState('')

  const errorSize2MB = useTranslation('errorSize2MB')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      const fileValue = e.target.files[0]
      if (fileValue.size < 2097152) {
        const reader = new FileReader()
        reader.onloadend = () => {
          handleUploadFile(reader.result)
        }
        reader.readAsDataURL(fileValue)
      } else {
        setError(errorSize2MB)
      }
    }
  }
  return (
    <div>
      <Button style={{ position: 'relative' }}>
        <input
          style={{
            opacity: '0',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            cursor: disabled ? 'default' : 'pointer',
          }}
          type="file"
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        {labelInput}
      </Button>
      <div style={{ fontSize: 14, color: 'red', paddingTop: 2 }}>{error ?? ''}</div>
    </div>
  )
}
