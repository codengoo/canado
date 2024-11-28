import { Colors } from '@/constants';
import { IconType } from 'react-icons';
import BtnAsset from './btn_asset';

interface ITabIcon {
  icon: IconType;
  onClick?: () => void;
}

export default function TabIcon({ icon, onClick }: ITabIcon) {
  return (
    <BtnAsset
      icon={icon}
      onClick={onClick}
      color={Colors.white}
      iconSize={28}
      type="tab"
      size='md'
    />
  );
}
