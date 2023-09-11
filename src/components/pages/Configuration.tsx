import { useCallback, useContext, useState, useEffect, useMemo } from 'react'
import { AlertState, ConfigTableProps, TypeTableAction, User } from '@types'

// Hooks
import { AuthContext } from '@hooks/contexts'

// Components
import { Divider } from '@mui/material'
import { AlertCustom, ButtonCustom, Loader, TextCustom } from '@atoms'
import {
  DialogUserAdd,
  DialogUserDelete,
  DialogUserEdit,
  DialogUserView,
} from '@organisms'
import { TableCustom } from '@templates'

// Services
import { apiGetUsers } from '@services/apis'

const Configuration = () => {
  const { auth } = useContext(AuthContext)
  const [users, setUsers] = useState<User[]>([])
  const [idUser, setIdUser] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showView, setShowView] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    description: '',
    severity: 'info',
  })

  const tableUsers = useMemo(
    () =>
      ({
        actions: ['view', 'edit', 'delete'],
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Nombre',
            accessor: 'name',
          },
          {
            Header: 'Correo',
            accessor: 'email',
          },
          {
            Header: 'Rol',
            accessor: 'role',
          },
        ],
      } as ConfigTableProps),
    [],
  )

  useEffect(() => {
    loadUsers()
  }, [])

  const resetForm = () => {
    setShowAlert(false)
  }

  const loadUsers = useCallback(async () => {
    resetForm()
    setLoader(true)
    const response = await apiGetUsers('es', auth.token)
    const { success, message, data } = response
    if (success) {
      setUsers(data)
    } else {
      setShowAlert(true)
      setAlert({
        title: 'Error',
        description: message,
        severity: 'error',
      })
    }
    setLoader(false)
  }, [auth.token])

  const handleTableActions = useCallback(
    (action: TypeTableAction, id: string) => {
      setIdUser(id)
      switch (action) {
        case 'view':
          setShowView(true)
          break
        case 'edit':
          setShowEdit(true)
          break
        case 'delete':
          setShowDelete(true)
          break
        default:
          setIdUser('')
          break
      }
    },
    [],
  )

  return (
    <div className="pb-4 flex flex-col">
      <TextCustom text="Configuración de usuarios" className="text-3xl" />
      <Divider />
      <div className="flex justify-end">
        <ButtonCustom
          text="Crear Usuario"
          className="my-3"
          onClick={() => setShowAdd(true)}
        />
      </div>
      <div className="px-4">
        <AlertCustom
          title={alert.title}
          description={alert.description}
          open={showAlert}
          setOpen={setShowAlert}
          severity={alert.severity}
        />
        <div className="flex flex-col relative">
          <TableCustom
            data={users}
            columns={tableUsers.columns}
            actions={tableUsers.actions}
            actionClick={handleTableActions}
            identifierSort="name"
            identifierHidden="id"
            identifierAction="id"
          />
          {loader && <Loader mode="modal" />}
        </div>
      </div>
      <DialogUserAdd
        open={showAdd}
        setOpen={setShowAdd}
        onDismiss={loadUsers}
      />
      <DialogUserDelete
        idUser={idUser}
        open={showDelete}
        setOpen={setShowDelete}
        onDismiss={loadUsers}
      />
      <DialogUserEdit
        idUser={idUser}
        open={showEdit}
        setOpen={setShowEdit}
        onDismiss={loadUsers}
      />
      <DialogUserView
        idUser={idUser}
        open={showView}
        setOpen={setShowView}
        onDismiss={loadUsers}
      />
    </div>
  )
}

export default Configuration
