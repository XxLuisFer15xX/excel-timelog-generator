import { memo } from 'react'
import { SelectCustomProps } from '@types'

// Components
import { Select, SelectChangeEvent } from '@mui/material'
import { FormControlCustom, MenuItemCustom, TextCustom } from '@atoms'

// Core
import { colors } from '@styles'

const SelectCustom = ({
  name = '',
  options = [],
  value = '',
  setValue = () => null,
  msgError = null,
  disabled = false,
  required = false,
  fontSize = 18,
  className = '',
}: SelectCustomProps) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    const inputValue: string = e.target.value
    setValue(inputValue)
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <FormControlCustom required={required} name={name} fontSize={fontSize}>
        <Select
          labelId="demo-simple-select-label"
          label={name}
          value={value}
          onChange={handleChange}
          className="w-full"
          size="medium"
          disabled={disabled}
          sx={{
            '& MuiPaper-root': { marginTop: 1 },
            '& legend': {
              marginLeft: 2,
              fontSize: fontSize * 0.82,
            },
            '& fieldset': {
              borderRadius: 2,
              border: typeof msgError === 'string' ? 2 : 1,
              borderColor:
                typeof msgError !== 'string'
                  ? colors['dark-gray']
                  : msgError.length === 0
                  ? colors.success
                  : colors.danger,
              color: colors.black,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
              color: colors.black,
            },
            backgroundColor: disabled ? colors['ligth-gray'] : colors.white,
            borderRadius: 2,
          }}
        >
          {options.map((option, index) => (
            <MenuItemCustom key={index} value={option?.id}>
              {option?.label}
            </MenuItemCustom>
          ))}
        </Select>
      </FormControlCustom>
      <TextCustom text={msgError} className="text-xs ml-1 mt-1 text-danger" />
    </div>
  )
}

export default memo(SelectCustom)
