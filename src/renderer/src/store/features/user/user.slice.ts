import { IUser } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrUser } from './thunks';

export interface UserState {
  user?: IUser;
  loading: boolean;
  errors: string[];
}

const initialState: UserState = {
  loading: false,
  errors: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectIsLogin: (state) => !!state.user,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchCurrUser.rejected, (state) => {
      state.loading = false;
      state.user = undefined;
    });
  },
});

export const {} = userSlice.actions;
export const { selectIsLogin, selectCurrentUser } = userSlice.selectors;

export default userSlice.reducer;
