import { useRouter } from 'next/router'
import React from 'react'

export default function DetailNew() {
  const router = useRouter()
  const id = router?.query?.id?.toString()

  return <div>{id}</div>
}
