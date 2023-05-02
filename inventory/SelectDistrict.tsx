/* eslint-disable react-hooks/rules-of-hooks */
import { SelectCustom } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall } from '@/hooks'
import { getMethod } from '@/services'
import { OptionsType } from '@/types'
import { DistrictResponse } from '@/types/address'
import { useEffect, useMemo } from 'react'

interface ISelectProvince {
  valueD: string
  setValueD: (val: string) => void
  valueW: string
  setValueW: (val: string) => void
  valueS?: string
  setValueS?: (val: string) => void
  buttonPropsD: Partial<any>
  buttonPropsW: Partial<any>
  buttonPropsS?: Partial<any>
  isNotStreet?: boolean
  type: 'read' | 'update'
  province: string
}

export const SelectDistrict = ({
  valueD,
  setValueD,
  valueW,
  setValueW,
  buttonPropsD,
  buttonPropsW,
  buttonPropsS,
  valueS,
  setValueS,
  province,
  isNotStreet,
  type,
}: ISelectProvince) => {
  const getDistricts = useApiCall<DistrictResponse, String>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.address.addressDistrict,
        params: {
          provinceCode: province,
        },
      }),
    handleSuccess() {
      setValueD('')
    },
    preventLoadingGlobal: isNotStreet,
  })

  const optionList: OptionsType<string>[] = getDistricts.data
    ? getDistricts.data.result.districts.map((item) => {
        return {
          label: `${item.pre} ${item.name}`,
          value: item.name,
        }
      })
    : []

  const optionWardList: OptionsType<string>[] =
    getDistricts?.data?.result.districts
      .find((item) => item.name === valueD)
      ?.ward.map((item) => {
        return {
          label: `${item.pre} ${item.name}`,
          value: item.name,
        }
      }) || []

  const optionStreetList: OptionsType<string>[] =
    getDistricts?.data?.result.districts
      .find((item) => item.name === valueD)
      ?.street.map((item) => {
        return {
          label: item,
          value: item,
        }
      }) || []

  useEffect(() => {
    if (province) {
      getDistricts.setLetCall(true)
    }
  }, [province])

  useEffect(() => {
    if (valueD === '') setValueW('')
  }, [valueD])

  useEffect(() => {
    if (valueW === '' && setValueS) setValueS('')
  }, [valueW])

  return (
    <>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        {useMemo(
          () => (
            <SelectCustom
              label="Quận / Huyện"
              value={valueD}
              onChange={setValueD}
              options={optionList}
              buttonProps={buttonPropsD}
              disabled={type === 'read' || getDistricts.loading}
            />
          ),
          [optionList, valueD]
        )}
      </div>
      <div style={{ gridColumn: 'span 1 / span 1' }}>
        {useMemo(
          () => (
            <SelectCustom
              label="Phường / Xã"
              value={valueW}
              onChange={setValueW}
              options={optionWardList}
              buttonProps={buttonPropsW}
              disabled={type === 'read' || getDistricts.loading}
            />
          ),
          [optionWardList, valueW]
        )}
      </div>
      {!isNotStreet && buttonPropsS && valueS && setValueS && (
        <div style={{ gridColumn: 'span 1 / span 1' }}>
          {useMemo(
            () => (
              <SelectCustom
                label="Đường"
                value={valueS}
                onChange={setValueS}
                options={optionStreetList}
                buttonProps={buttonPropsS}
                disabled={type === 'read' || getDistricts.loading}
              />
            ),
            [optionStreetList, valueS]
          )}
        </div>
      )}
    </>
  )
}
