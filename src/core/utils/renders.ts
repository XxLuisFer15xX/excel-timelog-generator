import { TypeColor } from '@types'

// Styles
import { colors } from '@styles'

export const renderColor = (
  typeColor: TypeColor | undefined,
): string | undefined => {
  switch (typeColor) {
    case 'primary':
      return colors.primary
    case 'secondary':
      return colors.secondary
    case 'success':
      return colors.success
    case 'danger':
      return colors.danger
    case 'warning':
      return colors.warning
    case 'dark-gray':
      return colors['dark-gray']
    case 'white':
      return colors.white
    default:
      return undefined
  }
}
