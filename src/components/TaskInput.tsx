import { useState } from 'react';
import { TaskFormData } from '../types';

interface TaskInputProps {
  onAddTask: (task: TaskFormData) => void;
  isLoading: boolean;
}

const TaskInput = ({ onAddTask, isLoading }: TaskInputProps) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Task text is required');
      return;
    }

    if (text.trim().length < 2) {
      setError('Task text must be at least 2 characters long');
      return;
    }

    if (text.trim().length > 100) {
      setError('Task text must be less than 100 characters');
      return;
    }

    setError('');
    onAddTask({ text: text.trim() });
    setText('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              placeholder="What is the task today?"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                error 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'
              }`}
              disabled={isLoading}
              maxLength={100}
            />
            <div className="absolute right-3 top-3 text-xs text-gray-500">
              {text.length}/100
            </div>
          </div>
          
          {error && (
            <p className="text-red-400 text-sm flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isLoading || !text.trim()
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Adding Task...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Task</span>
            </div>
          )}
        </button>
      </form>

      {/* Input Tips */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>💡 Tips:</p>
        <ul className="list-disc list-inside space-y-0.5 ml-4">
          <li>Be specific about your task</li>
          <li>Press Enter to quickly add a task</li>
          <li>Use action words like "Call", "Write", "Review"</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskInput;
