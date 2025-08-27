import { useEffect, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../types';
import SortableTaskItem from './SortableTaskItem';
import DroppableSection from './DroppableSection';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, text: string) => void;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  onReorderTasks: (tasks: Task[]) => void;
  isLoading: boolean;
  error: string | null;
}

const TaskList = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onToggleTask, 
  onReorderTasks,
  isLoading, 
  error 
}: TaskListProps) => {
  const completedSectionRef = useRef<HTMLDivElement>(null);
  const pendingSectionRef = useRef<HTMLDivElement>(null);
  const prevCompletedCount = useRef(0);
  const prevPendingCount = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);
    
    if (!activeTask) return;

    // If dropping on a task, reorder within the same status
    if (overTask && activeTask.completed === overTask.completed) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      onReorderTasks(reorderedTasks);
    }
    // If dropping on a droppable zone (section), change status
    else if (over.id === 'pending-section' || over.id === 'completed-section') {
      const newCompleted = over.id === 'completed-section';
      
      if (activeTask.completed !== newCompleted) {
        // Only trigger the toggle callback, let the parent handle the state update
        onToggleTask(activeTask.id);
      }
    }
  };

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-6">Your Tasks</h2>
          
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-300 dark:text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-400 dark:text-gray-500">Add your first task to get started!</p>
            </div>
          ) : (
            <>
              {/* Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Tasks Column */}
                <DroppableSection id="pending-section">
                  <div ref={pendingSectionRef} className="space-y-4 scroll-mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-purple-300 dark:text-purple-600">
                        📋 Pending Tasks
                      </h3>
                      <span className="bg-purple-600 dark:bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        {pendingTasks.length}
                      </span>
                    </div>
                    
                    {pendingTasks.length === 0 ? (
                      <div className="bg-gray-800 dark:bg-gray-100 rounded-lg p-6 text-center border-2 border-dashed border-gray-600 dark:border-gray-300 min-h-24">
                        <div className="text-4xl mb-2">🎯</div>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">No pending tasks</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">All caught up! Or drag completed tasks here.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                        {pendingTasks.map((task) => (
                          <SortableTaskItem
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onToggle={onToggleTask}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </DroppableSection>

                {/* Completed Tasks Column */}
                <DroppableSection id="completed-section">
                  <div ref={completedSectionRef} className="space-y-4 scroll-mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-green-300 dark:text-green-600">
                        ✅ Completed Tasks
                      </h3>
                      <span className="bg-green-600 dark:bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {completedTasks.length}
                      </span>
                    </div>
                    
                    {completedTasks.length === 0 ? (
                      <div className="bg-gray-800 dark:bg-gray-100 rounded-lg p-6 text-center border-2 border-dashed border-gray-600 dark:border-gray-300 min-h-24">
                        <div className="text-4xl mb-2">🏆</div>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">No completed tasks</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Start completing! Or drag pending tasks here.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                        {completedTasks.map((task) => (
                          <SortableTaskItem
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onToggle={onToggleTask}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </DroppableSection>
              </div>

            <div className="bg-gray-800 dark:bg-gray-100 rounded-lg p-4 border border-gray-700 dark:border-gray-300 transition-colors duration-200">
              <div className="flex justify-between text-sm text-gray-300 dark:text-gray-600">
                <span>Total Tasks: {tasks.length}</span>
                <span>Completed: {completedTasks.length}</span>
                <span>Remaining: {pendingTasks.length}</span>
              </div>
              <div className="mt-2 bg-gray-700 dark:bg-gray-300 rounded-full h-2">
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
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
