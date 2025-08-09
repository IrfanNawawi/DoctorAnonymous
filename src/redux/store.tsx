import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});