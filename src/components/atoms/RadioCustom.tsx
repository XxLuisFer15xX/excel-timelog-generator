import { RadioCustomProps } from '@types'

// Components
import { Radio } from '@mui/material'

// Core
import { renderColor } from '@core/utils'

const RadioCustom = ({
  value = false,
  setValue = () => null,
  disabled = false,
  size = 'medium',
  typeColor = undefined,
  fontSize = undefined,
}: RadioCustomProps) => {
  const handleChange = () => {
    setValue(!value)
  }

  return (
    <Radio
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

export default RadioCustom
