export interface Todo {
  id: number
  title: string
  note?: string
  isCompleted: boolean
  isImportant: boolean
  doneAt?: string
  createdAt: string
}

export interface TodosResponse {
  status: string
  data: Todo[]
  page: number
  limit: number
  total: number
}
