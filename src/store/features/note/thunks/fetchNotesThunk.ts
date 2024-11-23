import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

const fetchNotes = createAsyncThunk('note/fetchAll', async () => {
  const response = await axios.get('/note');
  if (response.status != 200) {
  }
  
  return response.data as any;
});

export default fetchNotes;
