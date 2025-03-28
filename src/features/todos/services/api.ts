import httpApi from '@/config/api'
import API_ENDPOINTS from '@/services/endpoints'

// Types
import type {ApiResponse} from '@/@types/common'
import type {Todo, TodosResponse} from '@/@types/todo'

// Fetch all todos
export const fetchTodos = async (
  params: {
    page?: number
    limit?: number
    isImportant?: boolean
    isCompleted?: boolean
  } = {page: 1, limit: 50}
) => {
  const {data} = await httpApi.get<TodosResponse>(API_ENDPOINTS.TODOS.GET_ALL, {params})
  return data
}

// Fetch todo by id
export const fetchTodoById = async (id: number) => {
  const {data} = await httpApi.get<ApiResponse<Todo>>(API_ENDPOINTS.TODOS.GET_BY_ID(id))
  return data
}

// Create a new todo
export const createTodo = async (todo: {title: string; isImportant?: boolean}) => {
  const {data} = await httpApi.post<ApiResponse<Todo>>(API_ENDPOINTS.TODOS.CREATE, todo)
  return data
}

// Update a todo
export const updateTodo = async (id: number, updates: Partial<{title: string; note: string}>) => {
  const {data} = await httpApi.patch<ApiResponse<Todo>>(API_ENDPOINTS.TODOS.UPDATE(id), updates)
  return data
}

// Delete a todo
export const deleteTodo = async (id: number) => {
  const {data} = await httpApi.delete(API_ENDPOINTS.TODOS.DELETE(id))
  return data
}

// Toggle completed todo
export const toggleCompletedTodo = async (id: number) => {
  const {data} = await httpApi.patch<ApiResponse<Todo>>(API_ENDPOINTS.TODOS.TOGGLE_COMPLETED(id))
  return data
}

// Toggle important todo
export const toggleImportantTodo = async (id: number) => {
  const {data} = await httpApi.patch<ApiResponse<Todo>>(API_ENDPOINTS.TODOS.TOGGLE_IMPORTANT(id))
  return data
}
