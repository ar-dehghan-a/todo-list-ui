export interface TodoItem {
  id: number
  title: string
  description?: string
  isCompleted: boolean
  isImportant: boolean
  doneAt?: string
  createdAt: string
}

export interface TodosResponse {
  status: string
  data: TodoItem[]
  page: number
  limit: number
  total: number
}
