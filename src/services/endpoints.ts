const API_ENDPOINTS = {
  TODOS: {
    GET_ALL: '/todos',
    GET_BY_ID: (id: number) => `/todos/${id}`,
    CREATE: '/todos',
    UPDATE: (id: number) => `/todos/${id}`,
    DELETE: (id: number) => `/todos/${id}`,
    TOGGLE_COMPLETED: (id: number) => `/todos/${id}/completed`,
    TOGGLE_IMPORTANT: (id: number) => `/todos/${id}/important`,
  },
}

export default API_ENDPOINTS
