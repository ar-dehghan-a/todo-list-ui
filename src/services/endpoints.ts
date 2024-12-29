const API_ENDPOINTS = {
  TODOS: {
    GET_ALL: '/todos',
    GET_BY_ID: (id: string) => `/todos/${id}`,
    CREATE: '/todos',
    UPDATE: (id: string) => `/todos/${id}`,
    DELETE: (id: string) => `/todos/${id}`,
  },
}

export default API_ENDPOINTS
