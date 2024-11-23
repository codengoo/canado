import { useAppDispatch } from '@/hooks';
import {
  createNote,
  fetchNotes,
  selectFetchingNoteStatus,
  selectNotes,
  updateNoteState,
} from '@/store/features/note';
import { ENoteState } from '@/types';
import React, { KeyboardEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Item from '../item';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { errors, loading } = useSelector(selectFetchingNoteStatus);
  const notes = useSelector(selectNotes);

  const handleItemDone = async (id: string) => {
    dispatch(updateNoteState({ id, status: ENoteState.COMPLETED }));
  };

  const handlePressEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    console.log(ev.key);
    
    if (ev.key == 'Enter') {
      const doc = document.querySelector('#add_value') as HTMLInputElement;
      if (doc?.value?.trim().length > 0) {
        dispatch(createNote({ title: doc.value, content: doc.value }));
        doc.value = '';
      }
    }
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    console.log(notes);
  }, [loading]);

  return (
    <div>
      <div className="p-5 bg-slate-50 w-screen h-screen flex flex-col overflow-x-hidden gap-4">
        <div className="space-y-4 flex-grow overflow-y-scroll">
          {notes.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              content={item.content}
              title={item.title}
              onDone={handleItemDone}
            />
          ))}
        </div>

        <div className=" flex-none">
          <input
            className="bg-slate-300 w-full"
            placeholder="type here"
            onKeyUp={handlePressEnter}
            id="add_value"
          />
        </div>
      </div>
    </div>
  );
}
