import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateUser, uploadAvatar, updateUserPassword, deleteUser} from './api'
import QUERY_KEYS from '@/services/queryKeys'

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: uploadAvatar,
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: data => {
      queryClient.setQueryData([QUERY_KEYS.CURRENT_USER], data)
    },
  })
}

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: updateUserPassword,
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
