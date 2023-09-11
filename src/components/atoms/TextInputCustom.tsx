import { memo } from 'react'
import { TextInputCustomProps } from '@types'

// Components
import { InputAdornment, SvgIconProps, TextField } from '@mui/material'
import { TextCustom, IconButtonCustom } from '@atoms'

// Core
import { validTextInput, validInputInitialNumbers } from '@core/validations'

// Styles
import { colors } from '@styles'

const TextInputCustom = ({
  name = '',
  value = '',
  setValue = () => null,
  onBlur = () => null,
  onEnter = () => null,
  placeholder = '',
  type = 'text',
  typesValidation = undefined,
  validInitNumbers = [],
  maxLength = undefined,
  className = '',
  iconStart = null,
  iconEnd = null,
  iconMode = 'adornment',
  iconTypeColor = 'primary',
  iconOnClick = () => null,
  msgError = null,
  disabled = false,
  multiline = false,
  required = false,
  fontSize = 18,
}: TextInputCustomProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value
    let isValid: boolean = true
    if (validInitNumbers.length) {
      isValid = validInputInitialNumbers(inputValue, validInitNumbers)
    } else {
      isValid = validTextInput(inputValue, typesValidation)
    }
    if (isValid || inputValue === '' || !inputValue) {
      setValue(inputValue)
    }
  }

  const renderIcon = (icon: React.ReactElement<SvgIconProps> | null) => {
    if (icon) {
      return iconMode === 'button' ? (
        <IconButtonCustom
          icon={icon}
          onClick={iconOnClick}
          typeColor={iconTypeColor}
        />
      ) : (
        <InputAdornment position="start">{icon}</InputAdornment>
      )
    } else {
      return null
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <TextField
        label={name}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
        onKeyDown={e => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') onEnter()
        }}
        variant="outlined"
        size="medium"
        multiline={multiline}
        minRows={multiline ? '3' : '1'}
        maxRows={multiline ? '4' : '1'}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        required={required}
        inputProps={{
          maxLength: maxLength,
          style: { textAlign: 'left' },
        }}
        InputProps={{
          startAdornment: renderIcon(iconStart),
          endAdornment: renderIcon(iconEnd),
        }}
        sx={{
          '& legend': { marginLeft: 2, fontSize: fontSize * 0.82 },
          '& .MuiInputBase-root': {
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
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              color: colors.black,
              fontSize,
            },
            fontFamily: 'poppins',
          },
          '& .MuiInputLabel-root': { fontFamily: 'poppins' },
          '& .MuiInputLabel-asterisk': { color: colors.danger },
          '& .MuiInputLabel-shrink': {
            marginLeft: 2,
            color: colors.black,
            fontSize,
            fontWeight: '600',
            '& .MuiInputLabel-asterisk': {
              color: colors.danger,
              display: 'inline',
            },
          },
          backgroundColor: disabled ? colors['ligth-gray'] : colors.white,
          borderRadius: 2,
          marginTop: 1,
        }}
      />
      <TextCustom text={msgError} className="text-xs ml-1 mt-1 text-danger" />
    </div>
  )
}

export default memo(TextInputCustom)
