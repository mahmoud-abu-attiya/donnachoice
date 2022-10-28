import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        setCartCount: (state, action) => {
            state.count = action.payload
        },
    },
})

export const { setCartCount } = counterSlice.actions

export default counterSlice.reducer