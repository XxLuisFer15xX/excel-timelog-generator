import { useContext, useState, useEffect } from 'react'
import { AlertState, DialogUserDeleteEditViewProps } from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { DialogActions, DialogContent } from '@mui/material'
import { AlertCustom, ButtonCustom, Loader, TextCustom } from '@atoms'
import { DialogCustom } from '@templates'

// Services
import { apiDeleteUser, apiGetUser } from '@services/apis'

const DialogUserDelete = ({
  idUser = '',
  open = false,
  setOpen = () => null,
  onDismiss = () => null,
}: DialogUserDeleteEditViewProps) => {
  const { auth } = useContext(AuthContext)
  const [loader, setLoader] = useState(false)
  const [name, setName] = useState('')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const resetForm = () => {
    setShowAlert(false)
    setName('')
    setLoader(false)
  }

  const loadUser = async () => {
    setLoader(true)
    const response = await apiGetUser('es', auth.token, idUser)
    const { success, message, data } = response
    if (success) {
      setName(data.name)
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
    setLoader(true)
    const response = await apiDeleteUser('es', auth.token, idUser)
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
  }

  return (
    <DialogCustom
      open={open}
      setOpen={setOpen}
      title="Eliminar Usuario"
      onDismiss={onDismiss}
    >
      <DialogContent style={{ width: 500 }}>
        <AlertCustom
          title={alert.title}
          description={alert.description}
          open={showAlert}
          setOpen={setShowAlert}
          severity={alert.severity}
        />
        <div className="flex flex-col relative items-center mt-4">
          <TextCustom text="¿Esta seguro que desea eliminar este Usuario?" />
          <TextCustom text={name} className="font-medium" />
          <TextCustom
            text="No lo podrá recuperar"
            className="my-3 text-danger"
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
          text="Eliminar"
          typeColor="primary"
          onClick={handleAccept}
        />
      </DialogActions>
    </DialogCustom>
  )
}

export default DialogUserDelete
