export interface DialogTestProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export interface DialogUserAddProps {
  open: boolean
  setOpen: (value: boolean) => void
  onDismiss: () => void
}

export interface DialogUserDeleteEditViewProps {
  idUser: string
  open: boolean
  setOpen: (value: boolean) => void
  onDismiss?: () => void
}

export interface HeaderMenuProps {
  drawerWidth: number
  handleDrawerToggle: () => void
}

export interface SideMenuProps {
  onChange: () => void
}
