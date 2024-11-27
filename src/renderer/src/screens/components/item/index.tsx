import { Colors } from '@/constants';
import { HiOutlineCheck } from 'react-icons/hi';
import TabIcon from '../../../components/ui/tab_icon';

interface IItemProps {
  title: string;
  content: string;
  id: string;
  onDone?: (id: string) => void;
}

export default function ItemNote({ title, content, onDone, id }: IItemProps) {
  const handleDoneClick = () => {
    onDone && onDone(id);
  };

  return (
    <div className="bg-primary p-4 rounded-xl border-secondary/50 border h-fit break-inside-avoid ">
      <div className="flex flex-row w-full gap-4">
        <h1 className="text-xl font-semibold flex-grow text-ellipsis text-gray-800">
          {title}
        </h1>
        <div className='flex-none'>
        <TabIcon
          icon={HiOutlineCheck}
          color={Colors.secondary}
          invert
          size={20}
          background
          onClick={handleDoneClick}
        />
        </div>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
}
