import {UploadResponse} from '@/@types/common'
import httpApi from '@/config/api'

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const {data} = await httpApi.post<UploadResponse>('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
