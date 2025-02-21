export type LanguageCode = 'en' | 'fa'

export interface ApiResponse<T> {
  status: string
  data: T
}
