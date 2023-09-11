import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
} from 'react-table'
import { TypeTableAction } from '@types'

export interface DialogTitleCustomProps {
  disabledIconClose?: boolean
  children: React.ReactNode
  onClose?: () => void
}

export interface TableHeadProps<T> {
  actionColumnTitle: string
  headerGroup: HeaderGroup<T>
  isActions: boolean
}

export interface TablePaginationProps {
  canPreviousPage: boolean
  canNextPage: boolean
  gotoPage: (value: number) => void
  nextPage: () => void
  pageIndex: number
  pageOptions: number[]
  previousPage: () => void
  isResetPagina: boolean
  setIsResetPagina: (value: boolean) => void
}

export interface TableBodyProps<T> {
  actionClick: (action: TypeTableAction, identifier: string, obj: T) => void
  actions: TypeTableAction[]
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<T> | undefined,
  ) => TableBodyProps
  identifierName: string | undefined
  isActions: boolean
  page: Row<T>[]
  prepareRow: (row: Row<T>) => void
}
