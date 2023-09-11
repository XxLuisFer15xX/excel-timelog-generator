import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrivateAndPublicRouteProps } from '@types'

const PublicRoute = ({
  isAuth,
  element: Element,
}: PrivateAndPublicRouteProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard/home', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }, [isAuth])

  return <Element />
}

export default PublicRoute
