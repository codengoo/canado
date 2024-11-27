import { IconType } from 'react-icons';

interface ITabIcon {
  icon: IconType;
  onClick?: () => void;
  color?: string;
  size?: number;
  invert?: boolean;
  danger?: boolean;
  padding?: 'sm' | 'md';
  background?: boolean;
}

export default function TabIcon({
  icon: Icon,
  color,
  size,
  onClick,
  invert,
  danger,
  padding = 'md',
  background,
}: ITabIcon) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-lg transition-all block group no-draggable ' +
        (invert ? 'hover:bg-secondary/20 ' : 'hover:bg-tertiary/10 ') +
        (danger ? 'hover:!bg-rose-500 ' : ' ') +
        (padding === 'md' ? 'p-2 ' : 'p-1 ') +
        (background ? 'bg-secondary/20 ' : ' ')
      }
    >
      <Icon
        className={danger ? 'group-hover:!text-white' : ' '}
        color={color || 'white'}
        size={size || 24}
      />
    </button>
  );
}
