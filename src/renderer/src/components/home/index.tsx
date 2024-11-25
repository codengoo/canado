import { Colors } from '@/constants';
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
import { GoHorizontalRule, GoX } from 'react-icons/go';
import { useSelector } from 'react-redux';
import Item from '../item';
import Sidebar from '../sidebar';
import TabIcon from '../tab_icon';

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
    <div className="flex flex-row bg-secondary rounded-3xl h-screen w-screen">
      <Sidebar />
      <div className="flex-grow">
        <div className="bg-tertiary w-full h-full flex flex-col overflow-x-hidden gap-4 rounded-2xl">
          <div className="flex flex-row justify-end p-2">
            <TabIcon
              icon={GoHorizontalRule}
              color={Colors.secondary}
              size={16}
              invert
            />
            <TabIcon
              icon={GoX}
              color={Colors.secondary}
              size={16}
              invert
              danger
            />
          </div>

          <div className="p-5">
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
      </div>
    </div>
  );
}
