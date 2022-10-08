import { NuxtApp } from '@nuxt/types/app'
import { AxiosRequestConfig } from 'axios'

export default function ({ $axios }: NuxtApp) {
  $axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.baseURL = process.env.API_URL
    return config
  })

  if (process.client) {
    $axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
