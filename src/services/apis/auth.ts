import axios from 'axios'
import { ApiResponse, TypeLanguage, User } from '@types'
import { Endpoints } from '@common/enums'
import { buildBasic } from './buildRequest'

interface UserLogin {
  email: string
  password: string
}

interface DataLogin {
  methods: string[]
  paths: string[]
  token: string
  user: User
}

export const apiLogin = async (language: TypeLanguage, params: UserLogin) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.login}`
  const dataResponse: ApiResponse<DataLogin> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as DataLogin,
  }

  try {
    const response = await axios.post(url, params, buildBasic(language))
    const { status, data } = response
    dataResponse.success = true
    dataResponse.data = data.data
    dataResponse.message = data.message
    dataResponse.statusCode = status
  } catch (error) {
    dataResponse.data = error
    if (!error.response?.status || !error.response?.data.message) {
      dataResponse.message = `Error inesperado. Código: ${error.code}`
      return dataResponse
    }
    dataResponse.message = error.response.data.message
    dataResponse.statusCode = error.response.status
  }
  return dataResponse
}
