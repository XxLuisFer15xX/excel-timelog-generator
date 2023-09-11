import { Navigate } from 'react-router-dom'
import { PrivateAndPublicRouteProps } from '@types'

const PrivateRoute = ({
  isAuth,
  element: Element,
}: PrivateAndPublicRouteProps) => {
  return isAuth ? <Element /> : <Navigate to="/login" replace />
}

export default PrivateRoute
