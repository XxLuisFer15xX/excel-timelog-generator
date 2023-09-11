import { ControlLabelCustomProps } from 'types'

// Components
import { FormControlLabel } from '@mui/material'

const ControlLabelCustom = ({
  value = undefined,
  children = {} as React.ReactElement<any, any>,
  name = '',
  align = 'end',
  className = '',
}: ControlLabelCustomProps) => {
  return (
    <FormControlLabel
      value={value}
      control={children}
      label={name}
      labelPlacement={align}
      className={className}
      sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'poppins' } }}
    />
  )
}

export default ControlLabelCustom
