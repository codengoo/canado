import { useAppDispatch } from '@/hooks';
import {
  fetchNotes,
  selectFetchingNoteStatus,
  selectNotes,
} from '@/store/features/note';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Item from '../item';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { errors, loading } = useSelector(selectFetchingNoteStatus);
  const notes = useSelector(selectNotes);

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
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>

        <div className=" flex-none">
          <input className="bg-slate-300 w-full" placeholder="type here" />
        </div>
      </div>
    </div>
  );
}
