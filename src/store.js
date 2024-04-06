import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/userSlice';
import { newOrderSlice } from './slice/newOrderSlice';

export const store = configureStore({
  reducer: {
    user:userSlice.reducer,
    newOrder:newOrderSlice.reducer
  },
});
