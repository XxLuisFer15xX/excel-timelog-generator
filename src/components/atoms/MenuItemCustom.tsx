import { MenuItemCustomProps } from '@types'

// Components
import { MenuItem } from '@mui/material'

// Core
import { colors } from '@styles'

const MenuItemCustom = ({
  children = null,
  value = '',
  ...rest
}: MenuItemCustomProps) => {
  return (
    <MenuItem
      value={value}
      className="font-poppins font-normal"
      sx={{
        '&: hover': {
          backgroundColor: colors.general,
          color: colors.white,
        },
        '&.Mui-selected': {
          backgroundColor: colors.primary,
          color: colors.white,
        },
        '&.Mui-selected:hover': {
          backgroundColor: colors.general,
          color: colors.white,
        },
      }}
      {...rest}
    >
      {children}
    </MenuItem>
  )
}

export default MenuItemCustom
