import React from 'react';
import { HiArchive, HiCalendar, HiCog, HiHome } from 'react-icons/hi';
import { HiArrowRightOnRectangle, HiBookmark } from 'react-icons/hi2';
import TabIcon from '../tab_icon';

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between p-4 items-center">
      <div className='bg-primary p-2 w-10 h-10 flex justify-center place-items-center rounded-full'>
        <img src="./images/logo.png" className="w-10 h-10 object-scale-down" />
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
