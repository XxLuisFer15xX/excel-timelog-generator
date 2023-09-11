import { AxiosRequestConfig } from 'axios'
import { TypeLanguage } from '@types'

export const buildBasic = <T>(language: TypeLanguage, request?: T) => {
  const apiUsername = import.meta.env.VITE_BASIC_AUTH_EMAIL
  const apiPassword = import.meta.env.VITE_BASIC_AUTH_PASSWORD
  const auth = 'Basic ' + window.btoa(apiUsername + ':' + apiPassword)
  let headers: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
      'Accept-Language': language,
    },
    params: request,
  }
  return headers
}

export const buildToken = <T>(
  language: TypeLanguage,
  token: string,
  request?: T,
) => {
  let headers: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Accept-Language': language,
    },
    params: request,
  }
  return headers
}
