import axios, {HttpStatusCode} from 'axios'
import type {AxiosError, InternalAxiosRequestConfig} from 'axios'

const httpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 10000,
})

const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) request.headers.Authorization = `Bearer ${token}`
  return request
}

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.response?.status === HttpStatusCode.Unauthorized) localStorage.removeItem('token')
  return Promise.reject(axiosError)
}

httpApi.interceptors.request.use(apiInterceptor)
httpApi.interceptors.response.use(res => res, errorInterceptor)

export default httpApi
