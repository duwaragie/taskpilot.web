import { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem = ({ task, onEdit, onDelete, onToggle }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-purple-900 to-violet-900 rounded-lg p-4 shadow-lg border border-purple-700 transition-all duration-500 hover:shadow-xl hover:border-purple-500 hover:-translate-y-1 ${
      task.completed 
        ? 'opacity-80 scale-[0.98] bg-gradient-to-r from-gray-800 to-gray-700' 
        : 'opacity-100 scale-100'
    }`}>
      {task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-violet-900/30 animate-fade-in"></div>
      )}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative group">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-6 h-6 appearance-none bg-gray-800 border-2 border-purple-600 rounded-md cursor-pointer transition-all duration-300 hover:border-purple-400 hover:scale-110 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 group-hover:shadow-lg group-hover:shadow-purple-500/25"
            />
            {task.completed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg 
                  className="w-4 h-4 text-white animate-check-bounce drop-shadow-sm" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            )}
            {task.completed && (
              <div className="absolute inset-0 bg-purple-600 rounded-md animate-bounce-in -z-10"></div>
            )}
          </div>
          
          {isEditing ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 bg-gray-800 border border-purple-600 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className="text-green-400 hover:text-green-300 text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <span
              className={`flex-1 text-lg transition-all duration-500 ease-in-out ${
                task.completed
                  ? 'text-gray-400 line-through transform scale-95'
                  : 'text-white transform scale-100'
              }`}
              style={{
                textDecorationColor: task.completed ? '#9333ea' : 'transparent',
                textDecorationThickness: '2px'
              }}
            >
              {task.text}
            </span>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-purple-400 hover:text-purple-300 transition-colors p-1"
              title="Edit task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-400 hover:text-red-300 transition-colors p-1"
              title="Delete task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-2 text-xs text-gray-400 transition-all duration-300">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskItem;
