import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: [],
}

export const counterSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      increment: (state, action) => {
         state.value.unshift(action.payload)
      },
      decrement: (state, action) => {
         state.value -= action.payload
      },
   },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer