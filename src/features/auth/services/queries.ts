import {useQuery} from '@tanstack/react-query'
import {getCurrentUser} from './api'
import QUERY_KEYS from '@/services/queryKeys'

export const useGetCurrentUser = (enabled: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: getCurrentUser,
    enabled,
    staleTime: Infinity,
  })
}
