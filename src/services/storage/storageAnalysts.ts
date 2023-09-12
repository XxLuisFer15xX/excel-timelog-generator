import { SelectableData, StorageResponse } from '@types'

export const stSetAnalysts = (data: SelectableData[]) => {
  const response = {
    success: false,
    message: '',
    data: null,
  }
  try {
    localStorage.setItem('analysts', JSON.stringify(data))
    response.success = true
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}

export const stGetAnalysts = (): StorageResponse<SelectableData[]> => {
  const response = {
    success: false,
    message: '',
    data: {} as SelectableData[],
  }
  try {
    const analysts = localStorage.getItem('analysts')
    if (analysts) {
      response.data = JSON.parse(analysts)
      response.success = true
    }
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}

export const stRemoveAnalysts = () => {
  const response = {
    success: false,
    message: '',
    data: null,
  }
  try {
    localStorage.removeItem('analysts')
    response.success = true
  } catch (error) {
    response.message = error.message
    response.data = error
  }
  return response
}
