import {useMutation, useQueryClient} from '@tanstack/react-query'
import QUERY_KEYS from '@/services/queryKeys'
import {createTodo, updateTodo, deleteTodo, toggleCompletedTodo, toggleImportantTodo} from './api'

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]}),
  })
}

export const useUpdateTodo = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: Partial<{title: string; note: string}>) => updateTodo(id, updates),
    onSuccess: result => {
      queryClient.setQueryData([QUERY_KEYS.TODO, id], result)
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]}),
  })
}

export const useToggleCompletedTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleCompletedTodo,
    onSuccess: result => {
      queryClient.setQueryData([QUERY_KEYS.TODO, result.data.id], result)
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}

export const useToggleImportantTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleImportantTodo,
    onSuccess: result => {
      queryClient.setQueryData([QUERY_KEYS.TODO, result.data.id], result)
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}
