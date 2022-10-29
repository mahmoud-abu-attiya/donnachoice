import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import wishListSlice from './slices/wishListSlice'
import wishlistIndicatorSlice from './slices/wishlistIndicatorSlice'
import cartIndicatorSlice from './slices/cartIndicatorSlice'
import compareIndicatorSlice from './slices/compareIndicatorSlice'

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      wishList: wishListSlice,
      wishlistIndicator: wishlistIndicatorSlice,
      cartIndicator: cartIndicatorSlice,
      compareIndicator: compareIndicatorSlice,
   },
})