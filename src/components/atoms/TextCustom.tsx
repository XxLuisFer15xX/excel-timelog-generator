import { TextCustomProps } from '@types'

// Components
import { Typography } from '@mui/material'

export const TextCustom = ({
  text = '',
  isParagraph = false,
  variant = 'inherit',
  isWrap = false,
  className = '',
}: TextCustomProps) => {
  return (
    <Typography
      paragraph={isParagraph}
      noWrap={isWrap}
      variant={variant}
      className={`font-poppins ${className}`}
    >
      {text}
    </Typography>
  )
}
