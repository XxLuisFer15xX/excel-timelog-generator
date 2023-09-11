import { validInputEmail } from '@core/validations'
import { ValidResponse } from '@types'

interface User {
  email: string
  password: string
}

export interface FormLogin {
  email: string | null
  password: string | null
}

export const formValidLogin = (user: User) => {
  const response: ValidResponse<FormLogin> = {
    isValid: true,
    msgValid: {} as FormLogin,
  }
  if (!user.email) {
    response.msgValid.email = 'Correo no ha sido asignado.\n'
    response.isValid = false
  } else {
    if (!validInputEmail(user.email, 'validateEmail')) {
      response.msgValid.email = 'Correo no válido.\n'
      response.isValid = false
    } else {
      response.msgValid.email = ''
    }
  }
  if (!user.password) {
    response.msgValid.password = 'Contraseña no ha sido asignada.\n'
    response.isValid = false
  } else {
    response.msgValid.password = ''
  }
  return response
}
