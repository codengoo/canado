import { Colors } from '@/constants';
import { IconType } from 'react-icons';

interface IBtnAsset {
  onClick?: () => void;
  icon?: IconType;
  iconSize?: number;
  image?: string;
  size?: 'sm' | 'md';
  color?: string;
  type?: 'danger' | 'normal' | 'tab';
}

export default function BtnAsset({
  onClick,
  icon: Icon,
  iconSize = 16,
  image,
  size = 'sm',
  color = Colors.secondary,
  type = 'normal',
}: IBtnAsset) {
  return (
    <button
      className={
        'rounded-lg transition-all group no-draggable flex justify-center items-center overflow-hidden ' +
        (size == 'sm' ? 'w-8 h-8 p-1 ' : ' p-1 ') +
        (type == 'danger'
          ? 'hover:!bg-rose-500 '
          : type == 'tab'
            ? 'hover:bg-tertiary/10'
            : 'hover:bg-secondary/20')
      }
      onClick={onClick}
    >
      {Icon && (
        <Icon
          color={color}
          size={iconSize}
          className={type == 'normal' ? '' : 'group-hover:!text-white'}
        />
      )}
      {image && <img src={image} className="object-scale-down rounded-full" />}
    </button>
  );
}
