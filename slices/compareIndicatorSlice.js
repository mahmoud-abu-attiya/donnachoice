import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        setCompareCount: (state, action) => {
            state.count = action.payload
        },
    },
})

export const { setCompareCount } = counterSlice.actions

export default counterSlice.reducer