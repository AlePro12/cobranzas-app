type SnackbarAlert = {
  open: boolean
  severity: AlertColor
  message: string
}

type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown'

type AlertColor = 'success' | 'info' | 'warning' | 'error'

type SnackbarAlertAction = {
  type: string
  payload: SnackbarAlert
}

type SequelizeResponse<T> = {
  dataValues: T
  isNewRecord: boolean
  uniqno: number
}

type CreatedAndUpdated = {
  createdAt: Date
  updatedAt: Date
}

type BasicComponentState = {
  loading: boolean
  message: string
}
