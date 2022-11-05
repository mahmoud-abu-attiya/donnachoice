import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value : false,
}

export const langsSlice = createSlice({
   name: "langs",
   initialState,
   reducers: {
      handelLangs : (state, action) => {
         state.value = action.payload
      }
   }
})

export const {handelLangs} = langsSlice.actions

export default langsSlice.reducer