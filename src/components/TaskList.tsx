import { useEffect, useRef } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, text: string) => void;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  isLoading: boolean;
  error: string | null;
}

const TaskList = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onToggleTask, 
  isLoading, 
  error 
}: TaskListProps) => {
  const completedSectionRef = useRef<HTMLDivElement>(null);
  const pendingSectionRef = useRef<HTMLDivElement>(null);
  const prevCompletedCount = useRef(0);
  const prevPendingCount = useRef(0);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  useEffect(() => {
    const currentCompletedCount = completedTasks.length;
    const currentPendingCount = pendingTasks.length;
    
    if (currentCompletedCount > prevCompletedCount.current && completedSectionRef.current) {
      setTimeout(() => {
        completedSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 300);
    }
    
    if (currentPendingCount > prevPendingCount.current && pendingSectionRef.current) {
      setTimeout(() => {
        pendingSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 300);
    }

    prevCompletedCount.current = currentCompletedCount;
    prevPendingCount.current = currentPendingCount;
  }, [completedTasks.length, pendingTasks.length]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Your Tasks</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Your Tasks</h2>
        <div className="bg-red-900 border border-red-600 rounded-lg p-4">
          <p className="text-red-200">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Tasks</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No tasks yet</h3>
          <p className="text-gray-400">Add your first task to get started!</p>
        </div>
      ) : (
        <>
          {pendingTasks.length > 0 && (
            <div ref={pendingSectionRef} className="space-y-4 scroll-mt-4">
              <h3 className="text-lg font-semibold text-purple-300">
                Pending ({pendingTasks.length})
              </h3>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onToggle={onToggleTask}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div ref={completedSectionRef} className="space-y-4 scroll-mt-4">
              <h3 className="text-lg font-semibold text-green-300">
                Completed ({completedTasks.length})
              </h3>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onToggle={onToggleTask}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Total Tasks: {tasks.length}</span>
              <span>Completed: {completedTasks.length}</span>
              <span>Remaining: {pendingTasks.length}</span>
            </div>
            <div className="mt-2 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: tasks.length > 0 ? `${(completedTasks.length / tasks.length) * 100}%` : '0%' 
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
