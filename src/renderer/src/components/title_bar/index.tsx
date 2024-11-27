import { Colors } from '@/constants';
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
import TabIcon from '../tab_icon';

export default function TitleBar() {
  const closeApp = () => window.api.closeWindows();
  const minimizeApp = () => window.api.minimizeWindows();

  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="flex flex-row justify-between p-2 draggable gap-2">
      <div className="flex flex-row">
        <TabIcon
          icon={HiOutlineArrowLeft}
          color={Colors.secondary}
          size={16}
          invert
        />
        <TabIcon
          icon={HiOutlineArrowRight}
          color={Colors.secondary}
          size={16}
          invert
        />
      </div>

      <div className="bg-secondary/20 w-1/2 rounded-lg overflow-hidden flex flex-row items-center no-draggable px-2 hover:bg-secondary/30 border border-secondary/50">
        <input
          placeholder="search here"
          className="w-full h-full bg-transparent focus:outline-none outline-none text-secondary text-center placeholder:text-secondary text-sm  transition-all"
        />
        <HiOutlineSearch size={20} className="text-secondary" />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-row">
          <TabIcon
            icon={HiOutlineBell}
            color={Colors.secondary}
            size={22}
            invert
            padding="sm"
          />
          {!!user ? (
            <div className="rounded-full">
              <img
                alt="user-avatar"
                src={user.avatar}
                className="object-scale-down"
              />
            </div>
          ) : (
            <TabIcon
              icon={HiOutlineUserCircle}
              color={Colors.secondary}
              size={22}
              invert
              padding="sm"
            />
          )}
        </div>

        <div className="flex flex-row">
          <TabIcon
            icon={GoHorizontalRule}
            color={Colors.secondary}
            size={16}
            invert
            onClick={minimizeApp}
          />
          <TabIcon
            icon={GoX}
            color={Colors.secondary}
            size={16}
            invert
            danger
            onClick={closeApp}
          />
        </div>
      </div>
    </div>
  );
}
