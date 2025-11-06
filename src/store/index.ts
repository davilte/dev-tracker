// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './reposSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    repos: reposReducer,
  },
});

// Infer types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
