import { Sidebar, TitleBar } from '@/components/layout';
import { useAppDispatch } from '@/hooks';
import { fetchNotes } from '@/store/features/note';
import { fetchCurrentUser } from '@/store/features/user';
import { useEffect } from 'react';
import InputNote from '../components/input_note';
import NoteContainer from '../components/note_container';

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className="flex flex-row bg-secondary rounded-3xl max-h-screen h-screen w-screen border border-secondary overflow-hidden">
      <Sidebar />
      <div className="flex-grow bg-tertiary flex flex-col overflow-x-hidden gap-4 rounded-2xl">
        <TitleBar />

        <div className="p-4 flex-grow overflow-hidden flex flex-col gap-4">
          <div className="flex-grow overflow-y-scroll relative">
            {/* <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-tertiary to-transparent pointer-events-none"></div> */}
            <NoteContainer />
            {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-tertiary to-transparent pointer-events-none"></div> */}
          </div>

          <div className="flex-none">
            <InputNote />
          </div>
        </div>
      </div>
    </div>
  );
}
