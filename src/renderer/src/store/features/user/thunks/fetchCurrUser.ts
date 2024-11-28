import { IResponseData, IUser } from '@/types';
import axios from '../../../../libs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const response = await axios.get(`/auth`);

  if (response.status != 200) throw new Error('Unauthorized');

  const res = response.data as IResponseData<IUser>;
  if (res.data) return res.data;
  else return;
});

export { fetchCurrentUser };
