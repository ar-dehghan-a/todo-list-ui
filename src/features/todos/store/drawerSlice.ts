import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface DrawerState {
  isOpen: boolean
  selectedTodoId: number | null
}

const initialState: DrawerState = {
  isOpen: false,
  selectedTodoId: null,
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<number>) {
      state.isOpen = true
      state.selectedTodoId = action.payload
    },
    closeDrawer(state) {
      state.isOpen = false
      state.selectedTodoId = null
    },
  },
})

export const {openDrawer, closeDrawer} = drawerSlice.actions
export default drawerSlice.reducer
