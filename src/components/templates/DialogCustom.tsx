import { memo } from 'react'
import { DialogCustomProps } from '@types'

// Components
import { Dialog } from '@mui/material'
import { TextCustom } from '@atoms'
import { DialogTitleCustom } from '@molecules'

const DialogCustom = ({
  children = null,
  disabledDismiss = false,
  disabledIconClose = false,
  onDismiss = () => null,
  open = false,
  setOpen = () => null,
  title = '',
}: DialogCustomProps) => {
  const handleClose = () => {
    onDismiss()
    setOpen(false)
    return false
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => !disabledDismiss && handleClose()}
      maxWidth={false}
    >
      <DialogTitleCustom
        onClose={handleClose}
        disabledIconClose={disabledIconClose}
      >
        <TextCustom text={title} className="font-medium py-2" />
      </DialogTitleCustom>
      {children}
    </Dialog>
  )
}

export default memo(DialogCustom)
