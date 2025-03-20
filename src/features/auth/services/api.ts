import httpApi from '@/config/api'
import API_ENDPOINTS from '@/services/endpoints'

interface RegisterCredentials {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterResponse {
  status: string
  token: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  status: string
  token: string
}

interface ForgotPasswordResponse {
  status: string
  message: string
}

export interface ResetPasswordCredentials {
  newPassword: string
  confirmPassword: string
}

interface ResetPasswordResponse {
  status: string
  token: string
}

export const register = async (credentials: RegisterCredentials) => {
  const {data} = await httpApi.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials)
  return data
}

export const login = async (credentials: LoginCredentials) => {
  const {data} = await httpApi.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
  return data
}

export const forgotPassword = async (email: string) => {
  const {data} = await httpApi.post<ForgotPasswordResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {email})
  return data
}

export const resetPassword = async (token: string, credentials: ResetPasswordCredentials) => {
  const {data} = await httpApi.patch<ResetPasswordResponse>(
    API_ENDPOINTS.AUTH.RESET_PASSWORD(token),
    credentials
  )
  return data
}
