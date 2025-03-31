export type LanguageCode = 'en' | 'fa'

export interface ApiResponse<T> {
  status: string
  data: T
  message?: string
}

export interface UploadResponse {
  status: 'success' | 'error'
  data: {
    id: string
    filename: string
    mimeType: string
    url: string
  }
}
