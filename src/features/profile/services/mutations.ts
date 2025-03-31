import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateUser, uploadAvatar} from './api'
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
