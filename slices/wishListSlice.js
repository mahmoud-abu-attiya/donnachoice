import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const data = [];

// const wishlist = () => {
//    fetch("http://3.83.152.24/api/products/?is_wishlist=1")
//    .then(res => {
//       res.json()
//       .then(pros => data = pros.data)
//    })
// }

// wishlist();

const initialState = {
   value: [],
}

export const wishSlice = createSlice({
   name: "wishList",
   initialState,
   reducers: {
      addToWishList: (state, action) => {
         state.value.unshift(action.payload)
      },
      removeFromWishList: (state, action) => {
         state.value.pop(action.payload)
      }
   }
})

export const { addToWishList, removeFromWishList } = wishSlice.actions

export default wishSlice.reducer