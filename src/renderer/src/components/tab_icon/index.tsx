import React from 'react';
import { IconType } from 'react-icons';

interface ITabIcon {
  icon: IconType;
  onClick?: () => void;
  color?: string;
  size?: number;
  invert?: boolean;
  danger?: boolean;
}

export default function TabIcon({
  icon: Icon,
  color,
  size,
  onClick,
  invert,
  danger,
}: ITabIcon) {
  return (
    <button
      onClick={onClick}
      className={
        ' p-2 rounded-lg transition-all block group ' +
        (invert ? 'hover:bg-secondary/20 ' : 'hover:bg-tertiary/10 ') +
        (danger ? 'hover:bg-rose-500 ' : ' ')
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
