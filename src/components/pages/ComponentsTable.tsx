import dayjs from 'dayjs'
import { useMemo } from 'react'
import { ConfigTableProps } from '@types'

// Components
import { Divider } from '@mui/material'
import { TextCustom } from '@atoms'
import { TableCustom } from '@templates'

// Data
import users from '@common/data/users.json'
import usersMin from '@common/data/users-min.json'

const ComponentsTable = () => {
  const tableBasic1 = useMemo(
    () =>
      ({
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Primer Nombre',
            accessor: 'first_name',
          },
          {
            Header: 'Segundo Nombre',
            accessor: 'last_name',
          },
          {
            Header: 'Fecha de Nacimiento',
            accessor: 'date_of_birth',
            Cell: ({ value }) => {
              const dateFormat = dayjs(new Date(value)).format('DD/MM/YYYY')
              return dateFormat
            },
          },
          {
            Header: 'Pais',
            accessor: 'country',
          },
          {
            Header: 'Telefono',
            accessor: 'phone',
          },
        ],
      } as ConfigTableProps),
    [],
  )
  const tableBasic2 = useMemo(
    () =>
      ({
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Primer Nombre',
            accessor: 'first_name',
          },
          {
            Header: 'Segundo Nombre',
            accessor: 'last_name',
          },
        ],
      } as ConfigTableProps),
    [],
  )
  const tableBasic3 = useMemo(
    () =>
      ({
        actions: ['view'],
        columns: [
          {
            Header: 'Id',
            accessor: 'id',
          },
          {
            Header: 'Primer Nombre',
            accessor: 'first_name',
          },
          {
            Header: 'Segundo Nombre',
            accessor: 'last_name',
          },
          {
            Header: 'Estado',
            accessor: 'STATE',
          },
        ],
      } as ConfigTableProps),
    [],
  )
  return (
    <div className="pb-4 flex flex-col">
      <TextCustom text="Tablas" className="text-6xl" />
      <Divider />
      {/* Tipos de Tablas */}
      <div className="px-4 pt-4">
        <div>
          <TextCustom text="Tabla básica" className="text-xl" />
          <Divider className="mb-2" />
          <TableCustom data={users} columns={tableBasic1.columns} />
        </div>
        <div className="mt-10">
          <TextCustom text="Tabla con búsqueda" className="text-xl" />
          <Divider className="mb-2" />
          <TableCustom data={usersMin} columns={tableBasic1.columns} isSearch />
        </div>
        <div className="mt-10">
          <TextCustom
            text="Tabla con ordenamiento por defecto"
            className="text-xl"
          />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic1.columns}
            identifierSort="first_name"
          />
        </div>
        <div className="mt-10">
          <TextCustom text="Tabla con columna id oculta" className="text-xl" />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic1.columns}
            identifierHidden="id"
          />
        </div>
        <div className="mt-10">
          <TextCustom text="Tabla con botones de acción" className="text-xl" />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic2.columns}
            actions={['view', 'add', 'edit', 'delete']}
            actionClick={(action, id, obj) => console.log(action, id, obj)}
          />
        </div>
        <div className="mt-10">
          <TextCustom
            text="Cambiando orden de botones de acción"
            className="text-xl"
          />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic2.columns}
            actions={['delete', 'edit', 'view']}
            actionClick={(action, id, obj) => console.log(action, id, obj)}
          />
        </div>
        <div className="mt-10">
          <TextCustom
            text="Título para la columna acción"
            className="text-xl"
          />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic2.columns}
            actionColumnTitle="Acciones"
            actions={['view', 'add', 'edit', 'delete']}
            actionClick={(action, id, obj) => console.log(action, id, obj)}
          />
        </div>
        <div className="mt-10">
          <TextCustom
            text="Columna first_name como identificador de acciones"
            className="text-xl"
          />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic2.columns}
            identifierAction="first_name"
            actions={['view', 'add', 'edit', 'delete']}
            actionClick={(action, id, obj) => console.log(action, id, obj)}
          />
        </div>
        <div className="mt-10">
          <TextCustom text="Estados para tabla" className="text-xl" />
          <Divider className="mb-2" />
          <TableCustom
            data={usersMin}
            columns={tableBasic3.columns}
            actions={tableBasic3.actions}
            identifierSort="STATE"
          />
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ComponentsTable
