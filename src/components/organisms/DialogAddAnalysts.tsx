import { memo, useEffect, useState } from 'react'
import { AlertState, DialogTestProps } from '@types'

// hooks
import { useMessage } from '@hooks/customs'

// components
import { DialogActions, DialogContent } from '@mui/material'
import {
  AlertCustom,
  ButtonCustom,
  Loader,
  TextCustom,
  TextInputCustom,
} from '@atoms'
import { DialogCustom } from '@templates'

// services
import { stGetAnalysts, stSetAnalysts } from '@services/storage'

interface FormData {
  name: string | null
}

const Component = ({ open = false, setOpen = () => null }: DialogTestProps) => {
  const [name, setName] = useState('')
  const [loader, setLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    description: '',
    severity: 'info',
  })
  const { messages, setMessages, resetMessages } = useMessage<FormData>({
    name: null,
  })

  useEffect(() => {
    if (!open) {
      resetValues()
    }
  }, [open])

  const resetValues = () => {
    setShowAlert(false)
    resetMessages()
    setName('')
    setLoader(false)
  }

  const formValid = () => {
    let isValid = true
    if (!name) {
      isValid = false
      setMessages({
        ...messages,
        name: 'Nombre no asignado',
      })
    }
    return isValid
  }

  const handleAccept = () => {
    resetMessages()
    if (formValid()) {
      setLoader(true)
      const { success, data } = stGetAnalysts()
      if (success) {
        let newAnalysts = [{ id: name, label: name }, ...data]
        stSetAnalysts(newAnalysts)
        setOpen(false)
      } else {
        setShowAlert(true)
        setAlert({
          title: `Error: No se agregó el analista.`,
          description: 'Ocurrió un error, recargue la página.',
          severity: 'error',
        })
      }
      setLoader(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <DialogCustom
      open={open}
      setOpen={setOpen}
      title="Agregar Analista"
      disabledDismiss
      disabledIconClose
    >
      <DialogContent style={{ width: 500 }}>
        <div className="flex flex-col relative pt-4">
          <AlertCustom
            title={alert.title}
            description={alert.description}
            open={showAlert}
            setOpen={setShowAlert}
            severity={alert.severity}
          />
          <TextCustom text="Ingrese los datos del Analista" variant="h5" />
          <TextInputCustom
            name="Nombre y Apellido"
            value={name}
            setValue={setName}
            className="mb-2"
            required
            onEnter={handleAccept}
            msgError={messages.name}
          />
          {loader && <Loader mode="modal" />}
        </div>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          text="Cancelar"
          typeColor="secondary"
          onClick={handleCancel}
          disabled={loader}
        />
        <ButtonCustom
          text="Guardar"
          typeColor="primary"
          onClick={handleAccept}
          disabled={loader}
        />
      </DialogActions>
    </DialogCustom>
  )
}

export const DialogAddAnalysts = memo(Component)
