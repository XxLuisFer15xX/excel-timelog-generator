import { memo, useEffect } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
  UseGlobalFiltersInstanceProps,
  UseTableOptions,
  UseGlobalFiltersState,
} from 'react-table'
import { TableCustomProps } from '@types'

// Assets
import SearchIcon from '@mui/icons-material/Search'

// Components
import { TextInputCustom } from '@atoms'
import { TablePagination, TableHead, TableBody } from '@molecules'

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseGlobalFiltersInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T> & UseGlobalFiltersState<T>
  }

const TableCustom = <T extends object>({
  columns = [],
  data = [],
  isSearch = false,
  identifierHidden = undefined,
  identifierAction = undefined,
  identifierSort = 'id',
  actionColumnTitle = '',
  actions = [],
  actionClick = () => null,
  isResetPagina = false,
  setIsResetPagina = () => null,
}: TableCustomProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    allColumns,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter,
  } = useTable<T>(
    {
      columns,
      data,
      autoResetPage: false,
      initialState: {
        sortBy: [
          {
            desc: false,
            id: identifierSort,
          },
        ],
      },
    } as UseTableOptions<T>,
    useGlobalFilter,
    useSortBy,
    usePagination,
  ) as TableInstanceWithHooks<T>

  const { globalFilter, pageIndex } = state

  useEffect(() => {
    if (identifierHidden) {
      const columnHide = allColumns.find(
        column => column.id === identifierHidden,
      )
      columnHide?.toggleHidden(true)
    }
  }, [])

  return (
    <div className="w-full">
      {isSearch && (
        <div>
          <TextInputCustom
            name="Buscar"
            value={globalFilter}
            setValue={setGlobalFilter}
            className="mb-2"
            iconStart={<SearchIcon />}
          />
        </div>
      )}
      <table
        className="w-full font-poppins font-normal border-collapse"
        {...getTableProps()}
      >
        {headerGroups.map((headerGroup, i) => (
          <TableHead
            key={i}
            headerGroup={headerGroup}
            isActions={actions.length > 0}
            actionColumnTitle={actionColumnTitle}
          />
        ))}
        <TableBody
          actions={actions}
          actionClick={actionClick}
          getTableBodyProps={getTableBodyProps}
          identifierName={identifierAction}
          isActions={actions.length > 0}
          page={page}
          prepareRow={prepareRow}
        />
      </table>
      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        previousPage={previousPage}
        isResetPagina={isResetPagina}
        setIsResetPagina={setIsResetPagina}
      />
    </div>
  )
}

export default memo(TableCustom)
