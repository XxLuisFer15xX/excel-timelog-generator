import {
  memo,
  useCallback,
  useMemo,
  useContext,
  useState,
  useEffect,
} from 'react'
import {
  AlertState,
  ConfigTableProps,
  DialogUserDeleteEditViewProps,
} from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { DialogActions, DialogContent } from '@mui/material'
import { AlertCustom, ButtonCustom, Loader, TextCustom } from '@atoms'
import { DialogCustom, TableCustom } from '@templates'

// Services
import { apiGetUser } from '@services/apis'

interface Permission {
  id: string
  path: string
  method: string
}

interface User {
  name: string
  email: string
  role: string
  permissions: Permission[]
}

const DialogUserView = ({
  idUser = '',
  open = false,
  setOpen = () => null,
}: DialogUserDeleteEditViewProps) => {
  const { auth } = useContext(AuthContext)
  const [user, setUser] = useState<User | null>(null)
  const [loader, setLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    description: '',
    severity: 'info',
  })

  const tablePermissions = useMemo(
    () =>
      ({
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Ruta',
            accessor: 'path',
          },
          {
            Header: 'Método',
            accessor: 'method',
          },
        ],
      } as ConfigTableProps),
    [],
  )

  useEffect(() => {
    if (open) {
      loadUser()
    } else {
      resetForm()
    }
  }, [open])

  const loadUser = useCallback(async () => {
    setLoader(true)
    const response = await apiGetUser('es', auth.token, idUser)
    const { success, message, data } = response
    if (success) {
      setUser(data)
    } else {
      setShowAlert(true)
      setAlert({
        title: 'Error',
        description: message,
        severity: 'warning',
      })
    }
    setLoader(false)
  }, [auth.token, idUser])

  const resetForm = () => {
    setUser(null)
    setLoader(false)
    setShowAlert(false)
  }

  const handleClose = () => {
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
      title="Información de Usuario"
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
          <TextCustom
            text="Información básica:"
            className="font-semibold mt-2 text-lg"
          />
          <div className="px-2 mb-2">
            <div className="flex gap-1">
              <TextCustom text="Nombre:" className="font-medium mb-1" />
              <TextCustom text={user?.name} />
            </div>
            <div className="flex gap-1">
              <TextCustom text="Email:" className="font-medium mb-1" />
              <TextCustom text={user?.email} />
            </div>
            <div className="flex gap-1">
              <TextCustom text="Role:" className="font-medium mb-1" />
              <TextCustom text={user?.role} />
            </div>
          </div>
          <TextCustom
            text="Lista de permisos:"
            className="font-semibold text-lg"
          />
          <TableCustom
            data={user?.permissions ? user?.permissions : []}
            columns={tablePermissions.columns}
            identifierHidden="id"
          />
          {loader && <Loader mode="modal" />}
        </div>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          text="Cerrar"
          typeColor="secondary"
          onClick={handleClose}
        />
      </DialogActions>
    </DialogCustom>
  )
}

export default memo(DialogUserView)
