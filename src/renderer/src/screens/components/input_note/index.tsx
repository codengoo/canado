import { useAppDispatch } from '@/hooks';
import { createNote } from '@/store/features/note';
import { FormEvent, KeyboardEvent } from 'react';
import {
  HiMiniMicrophone,
  HiMiniPaperClip,
  HiMiniSwatch,
  HiPaperAirplane,
} from 'react-icons/hi2';
import { BtnAsset } from '../../../components/ui';

export default function InputNote() {
  const dispatch = useAppDispatch();

  const handlePressEnter = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.key == 'Enter' && !ev.shiftKey) {
      const doc = document.querySelector('#add_value') as HTMLInputElement;
      if (doc?.value?.trim().length > 0) {
        dispatch(createNote({ title: doc.value, content: doc.value }));
        doc.value = '';
        doc.style.height = '';
      }
    }
  };

  const handleTextAreaEffect = (ev: FormEvent<HTMLTextAreaElement>) => {
    ev.preventDefault();
    const numMaxLine = 5;
    // @ts-ignore
    if (ev.target.scrollHeight > numMaxLine * 24) return;
    // @ts-ignore
    ev.target.style.height = '';
    // @ts-ignore
    ev.target.style.height = ev.target.scrollHeight + 'px';
  };

  return (
    <div className="bg-secondary/20 border border-secondary/50 rounded-lg p-4 space-y-4">
      <textarea
        className="bg-slate-300 w-full bg-transparent outline-none text-secondary placeholder:text-secondary resize-none transition-all"
        placeholder="Type here"
        onKeyUp={handlePressEnter}
        onInput={handleTextAreaEffect}
        id="add_value"
        rows={1}
      />

      <div className="flex justify-between">
        <div className="flex">
          <BtnAsset icon={HiMiniPaperClip} iconSize={20} />
          <BtnAsset icon={HiMiniMicrophone} iconSize={20} />
          <BtnAsset icon={HiMiniSwatch} iconSize={20} />
        </div>
        <BtnAsset icon={HiPaperAirplane} iconSize={20} />
      </div>
    </div>
  );
}
