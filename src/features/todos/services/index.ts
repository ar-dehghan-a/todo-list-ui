import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import httpApi from '@/config/api'
import API_ENDPOINTS from '@/services/endpoints'
import QUERY_KEYS from '@/services/queryKeys'

// Types
import type {ApiResponse} from '@/@types/common'
import type {Todo, TodosResponse} from '@/@types/todo'

// Fetch all todos
export const fetchTodos = async (params: {page: number; limit: number}) => {
  const {data} = await httpApi.get<TodosResponse>(API_ENDPOINTS.TODOS.GET_ALL, {params})
  return data
}

// // Fetch todo by id
// export const fetchTodo = async (id: string) => {
//   const {data} = await httpApi.get(API_ENDPOINTS.TODOS.GET_BY_ID(id))
//   return data
// }

// Create a new todo
export const createTodo = async (todo: {title: string}) => {
  const {data} = await httpApi.post(API_ENDPOINTS.TODOS.CREATE, todo)
  return data
}

// // Update a todo
// export const updateTodo = async (id: string, updates: Partial<{title: string; completed: boolean}>) => {
//   const {data} = await httpApi.patch(API_ENDPOINTS.TODOS.UPDATE(id), updates)
//   return data
// }

// // Delete a todo
// export const deleteTodo = async (id: string) => {
//   const {data} = await httpApi.delete(API_ENDPOINTS.TODOS.DELETE(id))
//   return data
// }

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

export const useTodos = (params: {page: number; limit: number} = {page: 1, limit: 50}) => {
  return useQuery({queryFn: () => fetchTodos(params), queryKey: [QUERY_KEYS.TODOS]})
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]}),
  })
}

// export const useUpdateTodo = () => {
//   const queryClient = useQueryClient()

//   return useMutation(({id, updates}: {id: string; updates: any}) => updateTodo(id, updates), {
//     onSuccess: () => queryClient.invalidateQueries(['todos']),
//   })
// }

// export const useDeleteTodo = () => {
//   const queryClient = useQueryClient()

//   return useMutation(deleteTodo, {
//     onSuccess: () => queryClient.invalidateQueries(['todos']),
//   })
// }

export const useToggleCompletedTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleCompletedTodo,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]}),
  })
}

export const useToggleImportantTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleImportantTodo,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]}),
  })
}
