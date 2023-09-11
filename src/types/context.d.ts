export interface PersonalInfo {
  name: string
  email: string
}

export interface AuthState {
  isLogin: boolean
  personalInfo: PersonalInfo
  token: string
}

export type AuthAction =
  | {
      type: 'login'
      payload: Omit<AuthState, 'isLogin'>
    }
  | {
      type: 'logout'
    }
  | {
      type: 'update-token'
      payload: Pick<AuthState, 'token'>
    }
  | {
      type: 'update-info'
      payload: Pick<AuthState, 'personalInfo'>
    }
