import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectNotes, updateNoteState } from '@/store/features/note';
import { ENoteState } from '@/types';
import ItemNote from '../item';

export default function NoteContainer() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);

  const handleItemDone = async (id: string) => {
    dispatch(updateNoteState({ id, status: ENoteState.COMPLETED }));
  };

  return (
    <div className="space-y-4 columns-2 overflow-y-auto overflow-x-hidden">
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
  );
}
