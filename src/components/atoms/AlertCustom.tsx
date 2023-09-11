import { useState } from 'react'
import { AlertCustomProps, TypeColor } from '@types'

// Components
import { Alert, AlertTitle, Collapse } from '@mui/material'
import { IconButtonCustom, TextCustom } from '@atoms'

// Assets
import CloseIcon from '@mui/icons-material/Close'

const AlertCustom = ({
  description = '',
  open = false,
  setOpen = () => null,
  severity = 'info',
  title = '',
}: AlertCustomProps) => {
  const [showMore, setShowMore] = useState(true)

  const renderTypeColor = (): TypeColor | undefined => {
    switch (severity) {
      case 'success':
        return 'success'
      case 'warning':
        return 'warning'
      case 'error':
        return 'danger'
      case 'info':
      default:
        return undefined
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButtonCustom
            icon={<CloseIcon fontSize="inherit" />}
            typeColor={renderTypeColor()}
            size={24}
            onClick={handleClose}
          />
        }
        className="flex items-center py-0"
      >
        <AlertTitle
          onClick={handleShowMore}
          className="font-poppins text-lg cursor-pointer"
          sx={{ '&.MuiTypography-root': { margin: 0 } }}
        >
          {title}
        </AlertTitle>
        <Collapse in={showMore}>{<TextCustom text={description} />}</Collapse>
      </Alert>
    </Collapse>
  )
}

export default AlertCustom
