import axios, {HttpStatusCode} from 'axios'
import type {AxiosError, InternalAxiosRequestConfig} from 'axios'

const httpApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 5000,
})

const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')
  if (token) request.headers.Authorization = `Bearer ${token}`
  return request
}

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.response?.status === HttpStatusCode.Unauthorized) localStorage.removeItem('accessToken')
  return Promise.reject(axiosError)
}

httpApi.interceptors.request.use(apiInterceptor)
httpApi.interceptors.response.use(res => res, errorInterceptor)

export default httpApi
