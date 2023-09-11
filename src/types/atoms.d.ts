import {
  AlertProps,
  BaseTextFieldProps,
  ButtonProps,
  CheckboxProps,
  FormControlLabelProps,
  RadioProps,
  SwitchProps,
  SvgIconProps,
  TypographyProps,
} from '@mui/material'
import {
  TypeAnimation,
  TypeColor,
  TypeInfoState,
  TypeInputIconMode,
  TypeLoader,
  TypeValidation,
} from '@types'

export type RadioSelectOptions = {
  id: string
  label: string
}

export interface AlertState {
  title: string
  description: string
  severity: AlertProps['severity']
}

export interface AlertCustomProps {
  description?: string
  open: boolean
  setOpen: (value: boolean) => void
  severity: AlertProps['severity']
  title: string
}

export interface ButtonCustomProps {
  text: string
  onClick?: () => void
  variant?: ButtonProps['variant']
  className?: string
  startIcon?: React.ReactElement<SvgIconProps> | null
  endIcon?: React.ReactElement<SvgIconProps> | null
  disabled?: boolean
  typeColor?: TypeColor
  textTransform?: React.CSSProperties['textTransform']
}

export interface CheckBoxCustomProps {
  value?: boolean
  setValue?: (value: boolean) => void
  disabled?: boolean
  size?: CheckboxProps['size']
  typeColor?: TypeColor
  fontSize?: number
}

export interface ControlLabelCustomProps {
  value?: FormControlLabelProps['value']
  children: FormControlLabelProps['control']
  name: string
  align?: FormControlLabelProps['labelPlacement']
  className?: string
}

export interface DatePickerCustomProps {
  name?: string
  value: Date | null
  setValue: (value: Date | null) => void
  required?: boolean
  disabled?: boolean
  minDate?: Date | undefined
  maxDate?: Date | undefined
  msgError?: string | null
  className?: string
  fontSize?: number
}

export interface DrawerItemProps {
  text: string
  onClick: () => void
  icon: React.ReactElement<SvgIconProps> | null
  isSelected?: boolean
  collapse?: boolean
  isCollapse?: boolean
}

export interface FormControlCustomProps {
  children: React.ReactNode
  name: string
  fontSize: number
  required?: boolean
}

export interface IconButtonCustomProps {
  onClick?: () => void
  size?: number
  className?: string
  icon: React.ReactElement<SvgIconProps> | null
  disabled?: boolean
  typeColor?: TypeColor
  typeColorHover?: TypeColor
}

export interface LoaderProps {
  typeAnimation?: TypeAnimation
  loop?: boolean
  size?: string | number
  mode?: TypeLoader
  speed?: number
  pause?: boolean
  setPause?: (value: boolean) => void
  play?: boolean
  setPlay?: (value: boolean) => void
  stop?: boolean
  setStop?: (value: boolean) => void
}

export interface MenuItemCustomProps {
  value: string
  children: React.ReactNode
}

export interface RadioCustomProps {
  value?: boolean
  setValue?: (value: boolean) => void
  disabled?: boolean
  size?: RadioProps['size']
  typeColor?: TypeColor
  fontSize?: number
}

export interface RadioButtonsCustomProps {
  name?: string
  value: string
  setValue: (value: string) => void
  options: RadioSelectOptions[]
  isRow?: boolean
  disabled?: boolean
  msgError?: string
  size?: RadioProps['size']
  typeColor?: TypeColor
  fontSize?: number
  className?: string
  labelClassName?: string
}

export interface SelectCustomProps {
  name?: string
  options: RadioSelectOptions[]
  value: string
  setValue: (value: string) => void
  msgError?: string | null
  disabled?: boolean
  required?: boolean
  fontSize?: number
  className?: string
}

export interface SwitchCustomProps {
  value?: boolean
  setValue?: (value: boolean) => void
  disabled?: boolean
  size?: SwitchProps['size']
  typeColor?: TypeColor
}

export interface BadgePointProps {
  state: TypeInfoState
  size?: number
  marginRight?: number
  className?: string
}

export interface TextCustomProps {
  text: string | undefined | null
  isParagraph?: boolean
  variant?: TypographyProps['variant']
  isWrap?: boolean
  className?: string
}

export interface TextInputCustomProps {
  name?: string
  value?: string
  setValue: (value: string) => void
  onBlur?: () => void
  onEnter?: () => void
  placeholder?: string
  type?: BaseTextFieldProps['type']
  typesValidation?: TypeValidation
  validInitNumbers?: number[]
  maxLength?: number
  className?: string
  iconStart?: React.ReactElement<SvgIconProps> | null
  iconEnd?: React.ReactElement<SvgIconProps> | null
  iconMode?: TypeInputIconMode
  iconTypeColor?: TypeColor
  iconOnClick?: () => void
  msgError?: string | null
  disabled?: boolean
  multiline?: boolean
  required?: boolean
  fontSize?: number
}
