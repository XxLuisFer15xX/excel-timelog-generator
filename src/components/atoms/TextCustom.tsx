import { TextCustomProps } from '@types'

// Components
import { Typography } from '@mui/material'

const TextCustom = ({
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
      className={`font-poppins font-normal ${className}`}
    >
      {text}
    </Typography>
  )
}

export default TextCustom
