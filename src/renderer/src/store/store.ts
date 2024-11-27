import { configureStore } from '@reduxjs/toolkit';
import { noteReducer } from './features/note';
import { userReducer } from './features/user';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    user: userReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
