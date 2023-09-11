import { useContext, useState } from 'react'
import { AlertState } from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'
import { useMessage } from '@hooks/customs'

// Components
import {
  AlertCustom,
  ButtonCustom,
  Loader,
  TextCustom,
  TextInputCustom,
} from '@atoms'

// Core
import { FormLogin, formValidLogin } from '@core/validations'

// Services
import { apiLogin } from '@services/apis'

const Login = () => {
  const { dispatchAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Validations
  const [loader, setLoader] = useState(false)
  const [enabledValid, setEnabledValid] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    description: '',
    severity: 'info',
  })
  const { messages, setMessages, resetMessages } = useMessage<FormLogin>({
    email: null,
    password: null,
  })

  const resetForm = () => {
    setShowAlert(false)
    resetMessages()
    setEmail('')
    setPassword('')
  }

  const handleLogin = async () => {
    setShowAlert(false)
    setEnabledValid(true)
    const isFormValid = handleFormValid()
    if (isFormValid) {
      setLoader(true)
      const response = await apiLogin('es', { email, password })
      const { success, message, statusCode, data } = response
      if (success) {
        dispatchAuth({
          type: 'login',
          payload: {
            personalInfo: {
              name: data.user.firstName,
              email: data.user.email,
            },
            token: data.token,
          },
        })
        resetForm()
      } else {
        setShowAlert(true)
        setAlert({
          title: `Error: ${statusCode}`,
          description: message,
          severity: 'error',
        })
      }
      setLoader(false)
    }
  }

  const handleFormValid = () => {
    const response = formValidLogin({ email, password })
    setMessages(response.msgValid)
    return response.isValid
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-700">
      <div className="flex flex-col w-96 px-6 py-8 rounded-xl bg-white">
        <TextCustom
          text="Inicio de sesión"
          className="self-center text-2xl font-bold text-general rounded-lg"
        />
        <div className="flex flex-col my-4 relative">
          <AlertCustom
            title={alert.title}
            description={alert.description}
            open={showAlert}
            setOpen={setShowAlert}
            severity={alert.severity}
          />
          <div className="flex flex-col gap-4 rounded-xl relative">
            <TextInputCustom
              name="Correo"
              type="email"
              value={email}
              setValue={setEmail}
              onBlur={() => enabledValid && handleFormValid()}
              onEnter={handleLogin}
              msgError={messages.email}
            />
            <TextInputCustom
              name="Contraseña"
              type="password"
              value={password}
              setValue={setPassword}
              onBlur={() => enabledValid && handleFormValid()}
              onEnter={handleLogin}
              msgError={messages.password}
            />
            <ButtonCustom
              text="Ingresar"
              onClick={handleLogin}
              className="w-full"
              typeColor="primary"
            />
          </div>
          {loader && <Loader mode="modal" />}
        </div>
      </div>
    </div>
  )
}

export default Login
