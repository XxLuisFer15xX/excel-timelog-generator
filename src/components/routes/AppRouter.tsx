import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { Login, Error404 } from '@pages'
import { DashboardRouter, PrivateRoute, PublicRoute } from '@routes'

const AppRouter = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute element={Login} isAuth={auth.isLogin} />}
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute element={DashboardRouter} isAuth={auth.isLogin} />
          }
        />
        <Route path="/page-error" element={<Error404 />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/page-error" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
