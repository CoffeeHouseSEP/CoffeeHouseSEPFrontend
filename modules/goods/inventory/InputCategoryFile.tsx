import { UploadFileBase64 } from '@/components'
import { PngImage } from '@/constants/image'
import Image from 'next/image'
import { useState } from 'react'

export default function InputCategoryFile() {
  const [base64, setBase64] = useState('')

  const setIconPath = (iconPath: string) => {
    setBase64(`${PngImage}${iconPath}`)
  }

  return (
    <div>
      <UploadFileBase64
        handleUploadFile={setIconPath}
        labelInput="Upload"
        id="uploadIconPath"
        accept=".png"
      />
      <Image src={base64} width={40} height={40} alt="zxczx" />
    </div>
  )
}
