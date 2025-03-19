import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {themeSlice} from '@/features/app'
import {drawerSlice} from '@/features/todos'
import {authSlice} from '@/features/auth'

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    drawer: drawerSlice,
    auth: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
