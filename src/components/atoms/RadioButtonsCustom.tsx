import { RadioButtonsCustomProps } from '@types'

// Components
import { Radio, RadioGroup } from '@mui/material'
import { ControlLabelCustom, TextCustom } from '@atoms'

// Core
import { renderColor } from '@core/utils'

const RadioButtonsCustom = ({
  name = '',
  value = '',
  setValue = () => null,
  options = [],
  isRow = false,
  disabled = false,
  msgError = '',
  size = undefined,
  typeColor = undefined,
  fontSize = undefined,
  className = '',
  labelClassName = '',
}: RadioButtonsCustomProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={`d-flex flex-column ${className}`}>
      <TextCustom text={name} className={`form-label ${labelClassName}`} />
      {msgError.length > 0 && (
        <TextCustom text={msgError} className="text-xs ml-1 mt-1 text-danger" />
      )}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        row={isRow}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <ControlLabelCustom key={index} value={option.id} name={option.label}>
            <Radio
              disabled={disabled}
              size={size}
              sx={{
                '& .MuiSvgIcon-root': { fontSize },
                '&.Mui-checked': { color: renderColor(typeColor) },
                color: renderColor(typeColor),
              }}
            />
          </ControlLabelCustom>
        ))}
      </RadioGroup>
    </div>
  )
}

export default RadioButtonsCustom
