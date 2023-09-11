import { SwitchCustomProps } from '@types'

// Components
import { Switch } from '@mui/material'

// Core
import { renderColor } from '@core/utils'

const SwitchCustom = ({
  value = false,
  setValue = () => null,
  disabled = false,
  size = 'medium',
  typeColor = undefined,
}: SwitchCustomProps) => {
  const handleChange = () => {
    setValue(!value)
  }

  return (
    <Switch
      checked={value}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      disabled={disabled}
      size={size}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: renderColor(typeColor),
          '&:hover': { backgroundColor: `${renderColor(typeColor)}2F` },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: renderColor(typeColor),
        },
      }}
    />
  )
}

export default SwitchCustom
