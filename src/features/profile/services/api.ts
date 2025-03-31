import httpApi from '@/config/api'
import API_ENDPOINTS from '@/services/endpoints'

// Types
import {ApiResponse, UploadResponse} from '@/@types/common'
import {User} from '@/@types/user'

interface UpdateUserRequest {
  name: string
  surname: string
  email: string
  photo: string | null
}

interface UpdateUserPasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface UpdateUserPasswordResponse {
  message: string
  token: string
}

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const {data} = await httpApi.post<UploadResponse>(API_ENDPOINTS.UPLOAD.UPLOAD_FILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const updateUser = async (user: Partial<UpdateUserRequest>) => {
  const {data} = await httpApi.patch<ApiResponse<User>>(API_ENDPOINTS.USERS.UPDATE, user)
  return data
}

export const updateUserPassword = async (passwords: UpdateUserPasswordRequest) => {
  const {data} = await httpApi.patch<UpdateUserPasswordResponse>(
    API_ENDPOINTS.USERS.UPDATE_PASSWORD,
    passwords
  )
  return data
}
