// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import userReducer from '@/slices/userSlice';
// import caseReducer from './caseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    // cases: caseReducer, // Any other state slices you need
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
