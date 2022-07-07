import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import destinationReducer from '../features/destinations/destinationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationReducer,
  },
})
