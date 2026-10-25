import { configureStore } from "@reduxjs/toolkit"

import authReducer from "@/redux/reducers/auth.reducers"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
    // plant: plantReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
