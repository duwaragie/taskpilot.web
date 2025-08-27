import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableSectionProps {
  id: string;
  children: ReactNode;
  isOver?: boolean;
}

const DroppableSection = ({ id, children }: DroppableSectionProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver 
          ? 'bg-purple-100 dark:bg-purple-900 bg-opacity-20 dark:bg-opacity-20 border-2 border-dashed border-purple-400 dark:border-purple-500 rounded-lg' 
          : ''
      }`}
    >
      {children}
    </div>
  );
};

export default DroppableSection;
