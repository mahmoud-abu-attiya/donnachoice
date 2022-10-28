import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        setAmount: (state, action) => {
            state.count = action.payload
        },
    },
})

export const { setAmount } = counterSlice.actions

export default counterSlice.reducer