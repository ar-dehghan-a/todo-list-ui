import httpApi from '@/config/api'

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

export const register = async (credentials: RegisterCredentials) => {
  const {data} = await httpApi.post<RegisterResponse>(`/auth/register`, credentials)
  return data
}

export const login = async (credentials: LoginCredentials) => {
  const {data} = await httpApi.post<LoginResponse>(`/auth/login`, credentials)
  return data
}

export const forgotPassword = async (email: string) => {
  const {data} = await httpApi.post<ForgotPasswordResponse>(`/auth/forgot-password`, {email})
  return data
}
