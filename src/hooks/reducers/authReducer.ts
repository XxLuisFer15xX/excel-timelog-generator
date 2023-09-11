import { AuthAction, AuthState } from '@types'

// Services
import { stSetAuth, stRemoveAuth } from '@services/storage'

export const INITIAL_AUTH: AuthState = {
  isLogin: false,
  personalInfo: {
    name: '',
    email: '',
  },
  token: '',
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  let newState: AuthState = {} as AuthState
  switch (action.type) {
    case 'login':
      newState = {
        isLogin: true,
        personalInfo: action.payload.personalInfo,
        token: action.payload.token,
      }
      stSetAuth(newState)
      return newState
    case 'update-info':
      newState = {
        ...state,
        personalInfo: action.payload.personalInfo,
      }
      stSetAuth(newState)
      return newState
    case 'update-token':
      newState = {
        ...state,
        token: action.payload.token,
      }
      stSetAuth(newState)
      return newState
    case 'logout':
      stRemoveAuth()
      return INITIAL_AUTH
    default:
      return state
  }
}

export default authReducer
