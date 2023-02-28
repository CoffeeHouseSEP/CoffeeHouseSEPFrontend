import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      pathName: window?.location?.pathname,
    },
  } as AxiosRequestConfig
})

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) return Promise.reject(error.response)
    return null
  }
)

export default axiosInstance
