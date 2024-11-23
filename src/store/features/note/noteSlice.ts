import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { fetchNotes } from './thunks';

interface Note {}

interface NoteState {
  notes: Note[];
  loading: boolean;
  errors: string[];
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  errors: [],
};

export const noteSlice = createSlice({
  name: 'note',
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
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      // state.errors = action.payload
    });
  },
});

export const {} = noteSlice.actions;

export const selectNotes = (state: RootState) => state.note.notes;
export const selectFetchingNoteStatus = (state: RootState) => ({
  loading: state.note.loading,
  errors: state.note.errors,
});

export default noteSlice.reducer;
