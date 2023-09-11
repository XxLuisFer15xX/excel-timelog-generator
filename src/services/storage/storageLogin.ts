import { AuthState, StorageResponse } from '@types'

export const stSetAuth = (data: AuthState) => {
  const response = {
    success: false,
    message: '',
    data: null,
  }
  try {
    localStorage.setItem('auth', JSON.stringify(data))
    response.success = true
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}

export const stGetAuth = (): StorageResponse<AuthState> => {
  const response = {
    success: false,
    message: '',
    data: {} as AuthState,
  }
  try {
    const isLogin = localStorage.getItem('auth')
    if (isLogin) {
      response.data = JSON.parse(isLogin)
      response.success = true
    }
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}

export const stRemoveAuth = () => {
  const response = {
    success: false,
    message: '',
    data: null,
  }
  try {
    localStorage.removeItem('auth')
    response.success = true
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}
