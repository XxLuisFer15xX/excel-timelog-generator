import { useEffect, useCallback, useReducer } from 'react'

// Hooks
import { authReducer, INITIAL_AUTH } from '@hooks/reducers'

// Components
import { AuthContext } from '@hooks/contexts'
import { AppRouter } from '@routes'

// Services
import { stGetAuth } from '@services/storage'

const App = () => {
  const [auth, dispatchAuth] = useReducer(authReducer, INITIAL_AUTH)

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = useCallback(() => {
    const { success, data } = stGetAuth()
    if (success) {
      const { isLogin, ...payload } = data
      dispatchAuth({
        type: 'login',
        payload,
      })
    } else {
      dispatchAuth({ type: 'logout' })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
