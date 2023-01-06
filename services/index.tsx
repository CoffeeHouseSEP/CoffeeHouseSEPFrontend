import axiosInstance from '@/lib/axios/request'
import { QueryParams } from '@/types'

export const getMethod = (pathName: string, token?: string, params?: QueryParams) => {
  return axiosInstance.get(pathName, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const postMethod = <T,>(
  pathName: string,
  token?: string,
  request?: T,
  params?: { [key: string]: string }
) => {
  return axiosInstance.post(pathName, request, {
    params,
    headers: {
      Authorization: token,
    },
  })
}

export const putMethod = <T,>(
  pathName: string,
  token?: string,
  params?: { [key: string]: string },
  request?: T
) => {
  return axiosInstance.put(pathName, request, {
    headers: {
      Authorization: token,
    },
    params,
  })
}
