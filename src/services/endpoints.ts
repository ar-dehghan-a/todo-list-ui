const API_ENDPOINTS = {
  AUTH: {
    CURRENT_USER: '/users/me',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
  },
  TODOS: {
    GET_ALL: '/todos',
    GET_BY_ID: (id: number) => `/todos/${id}`,
    CREATE: '/todos',
    UPDATE: (id: number) => `/todos/${id}`,
    DELETE: (id: number) => `/todos/${id}`,
    TOGGLE_COMPLETED: (id: number) => `/todos/${id}/completed`,
    TOGGLE_IMPORTANT: (id: number) => `/todos/${id}/important`,
  },
  USERS: {
    GET_ALL: '/users',
    UPDATE: '/users/me',
    DELETE: '/users/me',
  },
  UPLOAD: {
    UPLOAD_FILE: '/files/upload',
  },
}

export default API_ENDPOINTS
