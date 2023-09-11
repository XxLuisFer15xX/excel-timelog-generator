import { TableBodyProps, TypeTableAction } from '@types'
import { Cell } from 'react-table'

// Components
import { Tooltip } from '@mui/material'
import { IconButtonCustom, BadgePoint } from '@atoms'

// Assets
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface SomeObject {
  ENABLED?: boolean
  [key: string]: any
}

const TableBody = <T extends SomeObject>({
  actionClick = () => null,
  actions = [],
  getTableBodyProps,
  identifierName = 'id',
  isActions = false,
  page = [],
  prepareRow = () => null,
}: TableBodyProps<T>) => {
  const renderActions = (action: TypeTableAction) => {
    switch (action) {
      case 'view':
        return (
          <Tooltip title="Ver">
            <VisibilityIcon />
          </Tooltip>
        )
      case 'add':
        return (
          <Tooltip title="Agregar">
            <AddIcon />
          </Tooltip>
        )
      case 'edit':
        return (
          <Tooltip title="Editar">
            <EditIcon />
          </Tooltip>
        )
      case 'delete':
        return (
          <Tooltip title="Eliminar">
            <DeleteIcon />
          </Tooltip>
        )
      default:
        return (
          <Tooltip title="Delete">
            <VisibilityIcon />
          </Tooltip>
        )
    }
  }

  const renderCells = (cell: Cell<T, any>) => {
    let element = null
    if (cell.column.id === 'STATE') {
      element = <BadgePoint state={cell.value} />
    } else {
      element = cell.render('Cell')
    }
    return element
  }

  return (
    <tbody {...getTableBodyProps()}>
      {page.map(row => {
        prepareRow(row)
        return (
          <tr
            className="hover:bg-gray-200 even:bg-gray-100"
            {...row.getRowProps()}
          >
            {row.cells.map(cell => (
              <td
                className="border-b border-gray-300 px-3 h-10"
                {...cell.getCellProps()}
              >
                {renderCells(cell)}
              </td>
            ))}
            {isActions && (
              <td className="border-b border-gray-300 px-3 h-10">
                <div className="flex justify-end">
                  {actions.map((action, index) => {
                    let rowEnabled = row.original.ENABLED
                    let enabled = true
                    if (typeof rowEnabled === 'boolean') enabled = rowEnabled
                    return (
                      <IconButtonCustom
                        key={index}
                        icon={renderActions(action)}
                        typeColor="dark-gray"
                        typeColorHover="primary"
                        size={24}
                        onClick={() =>
                          actionClick(
                            action,
                            row.original[identifierName],
                            row.original,
                          )
                        }
                        disabled={!enabled}
                      />
                    )
                  })}
                </div>
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

export default TableBody
