import { CheckBoxCustomProps } from '@types'

// Components
import { Checkbox } from '@mui/material'

// Core
import { renderColor } from '@core/utils'

const CheckBoxCustom = ({
  value = false,
  setValue = () => null,
  disabled = false,
  size = 'medium',
  typeColor = undefined,
  fontSize = undefined,
}: CheckBoxCustomProps) => {
  const handleChange = () => {
    setValue(!value)
  }

  return (
    <Checkbox
      checked={value}
      onChange={handleChange}
      disabled={disabled}
      size={size}
      sx={{
        '& .MuiSvgIcon-root': { fontSize },
        '&.Mui-checked': { color: renderColor(typeColor) },
        color: renderColor(typeColor),
      }}
    />
  )
}

export default CheckBoxCustom
