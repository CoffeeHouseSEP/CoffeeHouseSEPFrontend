import { SelectCustom } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { OptionsType } from '@/types'
import { ProvinceResponse } from '@/types/address'
import { useEffect } from 'react'

interface ISelectProvince {
  value: string
  setValue: (val: string) => void
  buttonProps: Partial<any>
  type: 'read' | 'update'
}

export const SelectProvince = ({ value, setValue, buttonProps, type }: ISelectProvince) => {
  const getProvince = useApiCall<ProvinceResponse, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.address.addressProvince,
      }),
  })

  const optionList: OptionsType<string>[] = getProvince.data
    ? getProvince.data.result.provinces.map((item) => {
        return {
          label: item.name,
          value: item.code,
        }
      })
    : []

  useEffect(() => {
    getProvince.setLetCall(true)
  }, [])

  return (
    <SelectCustom
      label="Province"
      value={value}
      onChange={setValue}
      options={optionList}
      buttonProps={buttonProps}
      disabled={type === 'read'}
    />
  )
}
