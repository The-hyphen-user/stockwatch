import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './features/token/tokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
})