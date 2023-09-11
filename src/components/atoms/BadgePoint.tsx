import { BadgePointProps } from '@types'

// Styles
import { colors } from '@styles'

const BadgePoint = ({
  state = 'UNDEFINED',
  className = '',
  size = 8,
  marginRight = 12,
}: BadgePointProps) => {
  const renderColor = (): string => {
    switch (state) {
      case 'ACTIVE':
        return colors.success
      case 'INACTIVE':
        return colors.danger
      case 'VALID':
        return colors.success
      case 'EXPIRED':
        return colors.danger
      default:
        return colors['dark-gray']
    }
  }

  const renderLabel = (): string => {
    switch (state) {
      case 'ACTIVE':
        return 'Activo'
      case 'INACTIVE':
        return 'Inactivo'
      case 'VALID':
        return 'Vigente'
      case 'EXPIRED':
        return 'Expirado'
      default:
        return 'No definido'
    }
  }
  return (
    <div className={`flex justify-start items-center ${className}`}>
      <div
        style={{
          width: size,
          height: size,
          background: renderColor(),
          borderRadius: size,
          marginRight,
        }}
      ></div>
      {renderLabel()}
    </div>
  )
}

export default BadgePoint
