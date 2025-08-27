import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface SortableTaskItemProps {
  task: Task;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const SortableTaskItem = ({ task, onEdit, onDelete, onToggle }: SortableTaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      <div className="flex items-center gap-2">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-300 dark:text-gray-500 dark:hover:text-gray-400 cursor-grab active:cursor-grabbing transition-colors"
          aria-label="Drag to reorder"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8,18H11V15H8V18M13,18H16V15H13V18M8,14H11V11H8V14M13,14H16V11H13V14M8,10H11V7H8V10M13,10H16V7H13V10Z" />
          </svg>
        </button>
        
        {/* Task Item */}
        <div className="flex-1">
          <TaskItem
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableTaskItem;
