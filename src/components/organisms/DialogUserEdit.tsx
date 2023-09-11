import { useContext, useState, useEffect } from 'react'
import { AlertState, DialogUserDeleteEditViewProps } from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { DialogActions, DialogContent } from '@mui/material'
import { AlertCustom, ButtonCustom, Loader, TextInputCustom } from '@atoms'
import { DialogCustom } from '@templates'

// Services
import { apiGetUser, apiEditUser } from '@services/apis'

const DialogUserEdit = ({
  idUser = '',
  open = false,
  setOpen = () => null,
  onDismiss = () => null,
}: DialogUserDeleteEditViewProps) => {
  const { auth } = useContext(AuthContext)
  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
  const [loader, setLoader] = useState(false)
  const [enabledValid, setEnabledValid] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    description: '',
    severity: 'info',
  })

  useEffect(() => {
    if (open) {
      loadUser()
    } else {
      resetForm()
    }
  }, [open])

  const resetForm = () => {
    setName(undefined)
    setEmail(undefined)
    setPassword(undefined)
    setConfirmPassword(undefined)
    setLoader(false)
    setShowAlert(false)
  }

  const loadUser = async () => {
    setLoader(true)
    const response = await apiGetUser('es', auth.token, idUser)
    const { success, message, data } = response
    if (success) {
      setName(data.name)
      setEmail(data.email)
    } else {
      setShowAlert(true)
      setAlert({
        title: 'Error',
        description: message,
        severity: 'warning',
      })
    }
    setLoader(false)
  }

  const handleAccept = async () => {
    setShowAlert(false)
    setEnabledValid(true)
    setLoader(true)
    const params = {
      name,
      email,
      password,
      role: 'admin',
    }
    const response = await apiEditUser('es', auth.token, params, idUser)
    const { success, message } = response
    if (success) {
      setOpen(false)
      onDismiss()
    } else {
      setShowAlert(true)
      setAlert({
        title: 'Error',
        description: message,
        severity: 'error',
      })
    }
    setLoader(false)
  }

  const handleCancel = () => {
    setOpen(false)
    resetForm()
  }

  const handleDismiss = () => {
    resetForm()
  }

  return (
    <DialogCustom
      open={open}
      setOpen={setOpen}
      title="Editar Usuario"
      onDismiss={handleDismiss}
    >
      <DialogContent style={{ width: 500 }}>
        <AlertCustom
          title={alert.title}
          description={alert.description}
          open={showAlert}
          setOpen={setShowAlert}
          severity={alert.severity}
        />
        <div className="flex flex-col relative">
          <TextInputCustom
            name="Nombre"
            value={name}
            setValue={setName}
            onBlur={() => enabledValid}
            onEnter={handleAccept}
            className="mt-2"
            maxLength={50}
            required
            typesValidation={'onlyLettersExtend'}
          />
          <TextInputCustom
            name="Email"
            value={email}
            setValue={setEmail}
            onBlur={() => enabledValid}
            onEnter={handleAccept}
            className="mt-2"
            maxLength={30}
            required
          />
          <TextInputCustom
            name="Contraseña"
            value={password}
            setValue={setPassword}
            onBlur={() => enabledValid}
            onEnter={handleAccept}
            className="mt-2"
            type="password"
            maxLength={25}
          />
          <TextInputCustom
            name="Confirmar contraseña"
            value={confirmPassword}
            setValue={setConfirmPassword}
            onBlur={() => enabledValid}
            onEnter={handleAccept}
            className="mt-2"
            type="password"
            maxLength={25}
          />
          {loader && <Loader mode="modal" />}
        </div>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          text="Cancelar"
          typeColor="secondary"
          onClick={handleCancel}
        />
        <ButtonCustom
          text="Guardar"
          typeColor="primary"
          onClick={handleAccept}
        />
      </DialogActions>
    </DialogCustom>
  )
}

export default DialogUserEdit
