import { createContext } from 'react'
import { AuthAction, AuthState } from '@types'

type AuthContextType = {
  auth: AuthState
  dispatchAuth: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export default AuthContext
