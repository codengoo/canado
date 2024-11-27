import LogoUrl from '@/assets/images/logo.png';
import { TabIcon } from '@/components/ui';
import { HiArchive, HiCalendar, HiCog, HiHome } from 'react-icons/hi';
import { HiArrowRightOnRectangle, HiBookmark } from 'react-icons/hi2';

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between p-4 items-center draggable">
      <div className="bg-primary p-2 w-10 h-10 flex justify-center place-items-center rounded-full">
        <img src={LogoUrl} className="w-10 h-10 object-scale-down" />
      </div>

      <div className="space-y-4">
        <TabIcon icon={HiHome} />
        <TabIcon icon={HiCalendar} />
        <TabIcon icon={HiCog} />
        <TabIcon icon={HiArchive} />
        <TabIcon icon={HiBookmark} />
      </div>

      <div>
        <TabIcon icon={HiArrowRightOnRectangle} />
      </div>
    </div>
  );
}
