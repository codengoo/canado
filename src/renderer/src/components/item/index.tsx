import React from 'react';

interface IItemProps {
  title: string;
  content: string;
  id: string;
  onDone?: (id: string) => void;
}

export default function Item({ title, content, onDone, id }: IItemProps) {
  const handleDoneClick = () => {
    onDone && onDone(id);
  };

  return (
    <div className="w-full bg-slate-100 p-5 rounded-md border-slate-300 border flex items-center justify-between">
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>

      <button
        className="bg-blue-500 rounded-md text-white font-semibold px-3 py-2"
        onClick={handleDoneClick}
      >
        Complete
      </button>
    </div>
  );
}
