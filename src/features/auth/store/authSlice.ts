import {createSlice} from '@reduxjs/toolkit'

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token)
}

export const readToken = (): string => {
  return localStorage.getItem('accessToken') || ''
}

export const deleteToken = (): void => localStorage.removeItem('accessToken')

// export const persistUser = (user: UserModel): void => {
//   localStorage.setItem('user', JSON.stringify(user))
// }
// export const readUser = (): UserModel | null => {
//   const userStr = localStorage.getItem('user')
//   return userStr ? JSON.parse(userStr) : null
// }
// export const deleteUser = (): void => localStorage.removeItem('user')

export interface AuthSlice {
  token: string | null
}

const initialState: AuthSlice = {
  token: readToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      persistToken(action.payload)
    },
    clearToken: state => {
      state.token = ''
      deleteToken()
    },
  },
})

export const {setToken, clearToken} = authSlice.actions
export default authSlice.reducer
