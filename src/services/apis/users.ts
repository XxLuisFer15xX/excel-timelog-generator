import axios from 'axios'
import { ApiResponse, TypeLanguage, User } from '@types'
import { Endpoints } from '@common/enums'
import { buildToken } from './buildRequest'

interface AddUser {
  email: string
  name: string
  password: string
  role: string
}

interface EditUser {
  email?: string
  name?: string
  password?: string
  role?: string
}

export const apiGetUsers = async (language: TypeLanguage, token: string) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.users}`
  const dataResponse: ApiResponse<User[]> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as User[],
  }

  try {
    const response = await axios.get(url, buildToken(language, token))
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

export const apiGetUser = async (
  language: TypeLanguage,
  token: string,
  idUser: string,
) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.users}/${idUser}`
  const dataResponse: ApiResponse<User> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as User,
  }

  try {
    const response = await axios.get(url, buildToken(language, token))
    const { status, data } = response
    dataResponse.success = true
    dataResponse.data = data.data
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

export const apiAddUser = async (
  language: TypeLanguage,
  token: string,
  params: AddUser,
) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.users}`
  const dataResponse: ApiResponse<User[]> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as User[],
  }

  try {
    const response = await axios.post(url, params, buildToken(language, token))
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

export const apiEditUser = async (
  language: TypeLanguage,
  token: string,
  params: EditUser,
  idUser: string,
) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.users}/${idUser}`
  const dataResponse: ApiResponse<User[]> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as User[],
  }

  try {
    const response = await axios.patch(url, params, buildToken(language, token))
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

export const apiDeleteUser = async (
  language: TypeLanguage,
  token: string,
  idUser: string,
) => {
  const url = `${import.meta.env.VITE_APP_API}${Endpoints.users}/${idUser}`
  const dataResponse: ApiResponse<User> = {
    success: false,
    statusCode: 0,
    message: '',
    data: {} as User,
  }

  try {
    const response = await axios.delete(url, buildToken(language, token))
    const { status, data } = response
    dataResponse.success = true
    dataResponse.data = data.data
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
