import { FormControlCustomProps } from '@types'

// Components
import { FormControl, InputLabel } from '@mui/material'

// Core
import { colors } from '@styles'

const FormControlCustom = ({
  children = null,
  name = '',
  fontSize = 18,
  required = false,
}: FormControlCustomProps) => {
  return (
    <FormControl size="medium" required={required} fullWidth>
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          '&.MuiInputLabel-root': {
            fontFamily: 'poppins',
          },
          '& .MuiInputLabel-asterisk': { color: colors.danger },
          '&.MuiInputLabel-shrink': {
            marginLeft: 2,
            color: colors.black,
            fontSize,
            fontWeight: '600',
            '& .MuiInputLabel-asterisk': {
              color: colors.danger,
              display: 'inline',
            },
          },
        }}
      >
        {name}
      </InputLabel>
      {children}
    </FormControl>
  )
}

export default FormControlCustom
