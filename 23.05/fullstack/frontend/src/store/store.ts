import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/AuthSlice';



export const rootReducer = combineSlices(
  authSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});
