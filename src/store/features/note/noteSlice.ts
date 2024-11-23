import { ENoteState, INote } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createNote, fetchNotes, updateNoteState } from './thunks';

interface NoteState {
  notes: INote[];
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

    builder.addCase(updateNoteState.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateNoteState.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note,
      );
    });

    builder.addCase(createNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = [...state.notes, action.payload];
    });
  },
});

export const {} = noteSlice.actions;

export const selectNotes = (state: RootState) =>
  state.note.notes.filter((t) => t.state === ENoteState.ON_GOING);
export const selectFetchingNoteStatus = (state: RootState) => ({
  loading: state.note.loading,
  errors: state.note.errors,
});

export default noteSlice.reducer;
