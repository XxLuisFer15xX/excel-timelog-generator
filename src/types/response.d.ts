export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export interface StorageResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ValidResponse<T> {
  isValid: boolean
  msgValid: T
}
