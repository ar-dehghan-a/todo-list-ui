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
    mutationFn: (updates: Partial<{title: string; completed: boolean}>) => updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODO, id]})
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}

export const useToggleCompletedTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleCompletedTodo,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODO, data.id]})
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}

export const useToggleImportantTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleImportantTodo,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODO, data.id]})
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
    },
  })
}
