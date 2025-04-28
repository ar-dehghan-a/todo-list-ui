export interface Todo {
  id: number
  title: string
  note?: string
  isCompleted: boolean
  isImportant: boolean
  dueDate: null | string
  doneAt?: string
  createdAt: string
}

export interface TodosResponse {
  status: string
  data: Todo[]
  meta: {
    page: number
    limit: number
    total: number
  }
}
