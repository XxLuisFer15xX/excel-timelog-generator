import { TypeTableAction } from '@types'
import { Column } from 'react-table'

export interface DashboardLayoutProps {
  children?: React.ReactNode
}

export interface DialogCustomProps {
  children: React.ReactNode
  disabledDismiss?: boolean
  disabledIconClose?: boolean
  onDismiss?: () => void
  open: boolean
  setOpen: (value: boolean) => void
  title?: string
}

export interface TableCustomProps<T> {
  columns: Column<T>[]
  data: T[]
  isSearch?: boolean
  identifierHidden?: string
  identifierAction?: string
  identifierSort?: string
  actionColumnTitle?: string
  actions?: TypeTableAction[]
  actionClick?: (action: TypeTableAction, identifier: string, obj: T) => void
  isResetPagina?: boolean
  setIsResetPagina?: () => void
}

export interface ConfigTableProps {
  columns: Column[]
  actions?: TypeTableAction[]
}
