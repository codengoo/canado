import { BtnAsset } from '@/components/ui';
import { useAppSelector } from '@/hooks';
import { selectCurrentUser } from '@/store/features/user';
import { GoHorizontalRule, GoX } from 'react-icons/go';
import { HiOutlineSearch } from 'react-icons/hi';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineBell,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

export default function TitleBar() {
  const closeApp = () => window.api.closeWindows();
  const minimizeApp = () => window.api.minimizeWindows();

  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="flex flex-row justify-between p-2 draggable gap-2">
      {/* Navigation */}
      <div className="flex flex-row">
        <BtnAsset icon={HiOutlineArrowLeft} />
        <BtnAsset icon={HiOutlineArrowRight} />
      </div>

      {/* Search */}
      <div className="bg-secondary/20 w-1/2 rounded-lg overflow-hidden flex flex-row items-center no-draggable px-2 hover:bg-secondary/30 border border-secondary/50">
        <input
          placeholder="search here"
          className="w-full h-full bg-transparent focus:outline-none outline-none text-secondary text-center placeholder:text-secondary text-sm  transition-all"
        />
        <HiOutlineSearch size={20} className="text-secondary" />
      </div>

      {/* User action center */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-row">
          <BtnAsset icon={HiOutlineBell} iconSize={22} />
          {!!user ? (
            <BtnAsset image={user.avatar} />
          ) : (
            <BtnAsset icon={HiOutlineUserCircle} iconSize={22} />
          )}
        </div>

        <div className="flex flex-row">
          <BtnAsset icon={GoHorizontalRule} onClick={minimizeApp} />
          <BtnAsset icon={GoX} onClick={closeApp} type="danger" />
        </div>
      </div>
    </div>
  );
}
