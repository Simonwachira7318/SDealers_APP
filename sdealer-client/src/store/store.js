// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});