import {useQuery} from '@tanstack/react-query'
import QUERY_KEYS from '@/services/queryKeys'
import {fetchTodoById, fetchTodos} from './api'

export const useTodos = (
  params: {
    page?: number
    limit?: number
    isImportant?: boolean
    isCompleted?: boolean
  } = {}
) => {
  return useQuery({
    queryFn: () => fetchTodos(params),
    queryKey: [QUERY_KEYS.TODOS, params],
    select: data => data.data,
  })
}

export const useTodoById = (id: number) => {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: [QUERY_KEYS.TODO, id],
    enabled: !!id,
  })
}
