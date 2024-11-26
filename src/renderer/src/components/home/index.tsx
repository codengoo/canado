import { useAppDispatch } from '@/hooks';
import {
  createNote,
  fetchNotes,
  selectFetchingNoteStatus,
  selectNotes,
  updateNoteState,
} from '@/store/features/note';
import { ENoteState } from '@/types';
import { DragEvent, KeyboardEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ItemNote from '../item';
import Sidebar from '../sidebar';
import TitleBar from '../title_bar';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {} = useSelector(selectFetchingNoteStatus);
  const notes = useSelector(selectNotes);

  const handleItemDone = async (id: string) => {
    dispatch(updateNoteState({ id, status: ENoteState.COMPLETED }));
  };

  const handlePressEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == 'Enter') {
      const doc = document.querySelector('#add_value') as HTMLInputElement;
      if (doc?.value?.trim().length > 0) {
        dispatch(createNote({ title: doc.value, content: doc.value }));
        doc.value = '';
      }
    }
  };

  const dragfile = (event: DragEvent) => {
    event.preventDefault();
    return false;
    // window.api.startDrag('hello.ts');
  };

  const dragoverfile = (event: DragEvent) => {
    event.preventDefault();
    return false;
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <div className="flex flex-row bg-secondary rounded-3xl max-h-screen h-screen w-screen border border-secondary overflow-hidden">
      <Sidebar />
      <div className="flex-grow bg-tertiary flex flex-col overflow-x-hidden gap-4 rounded-2xl">
        <TitleBar />

        <div
          className="p-4 flex-grow overflow-hidden flex flex-col gap-4"
          onDrop={dragfile}
          onDragOver={dragoverfile}
        >
          <div className="flex-grow overflow-y-scroll overflow-x-hidden space-y-4 columns-2 ">
            {notes.map((item) => (
              <ItemNote
                key={item.id}
                id={item.id}
                content={item.content}
                title={item.title}
                onDone={handleItemDone}
              />
            ))}
          </div>

          <div className="flex-none">
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
  );
}
