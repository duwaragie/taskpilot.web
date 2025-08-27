import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFormData, AppState } from './types';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from './utils/api';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import DeletionTimer from './components/DeletionTimer';
import ToastContainer from './components/ToastContainer';
import { ToastProvider, useToast } from './contexts/ToastContext';

interface PendingDeletion {
  taskId: number;
  taskTitle: string;
}

function AppContent() {
  const { addToast } = useToast();
  const [state, setState] = useState<AppState>({
    tasks: [],
    isLoading: false,
    error: null,
  });
  
  const [pendingDeletion, setPendingDeletion] = useState<PendingDeletion | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetchTasks();
      if (response.success) {
        setState(prev => ({
          ...prev,
          tasks: response.data,
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'Failed to load tasks',
          isLoading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'An unexpected error occurred',
        isLoading: false,
      }));
    }
  };

  const handleAddTask = async (taskData: TaskFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await createTask(taskData);
      setState(prev => ({
        ...prev,
        tasks: [response.data, ...prev.tasks],
        isLoading: false,
      }));
      addToast('Task created successfully!', 'success');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to create task',
        isLoading: false,
      }));
      addToast('Failed to create task', 'error');
    }
  };

  const handleEditTask = async (id: number, text: string) => {
    try {
      await updateTask(id, { text });
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task =>
          task.id === id 
            ? { ...task, text }
            : task
        ),
      }));
      addToast('Task updated successfully!', 'success');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update task',
      }));
      addToast('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = (id: number) => {
    // Prevent starting a new deletion if one is already pending
    if (pendingDeletion) {
      return;
    }

    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    
    setPendingDeletion({
      taskId: id,
      taskTitle: task.text
    });
  };

  const confirmDeleteTask = useCallback(async (taskId: number) => {
    // Check if task still exists and we have a pending deletion
    const taskExists = state.tasks.some(task => task.id === taskId);
    if (!taskExists || !pendingDeletion || pendingDeletion.taskId !== taskId) {
      return;
    }

    try {
      await deleteTask(taskId);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== taskId),
      }));
      addToast('Task deleted successfully!', 'success');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete task',
      }));
      addToast('Failed to delete task', 'error');
    } finally {
      setPendingDeletion(null);
    }
  }, [state.tasks, pendingDeletion, addToast]);

  const abortDeleteTask = useCallback(() => {
    setPendingDeletion(null);
    addToast('Task deletion canceled', 'info');
  }, [addToast]);

  const handleToggleTask = async (id: number) => {
    try {
      const task = state.tasks.find(t => t.id === id);
      if (!task) return;

      await toggleTaskComplete(id);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(t =>
          t.id === id 
            ? { ...t, completed: !t.completed }
            : t
        ),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to toggle task',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Get Things Done!
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Your personal task manager to boost productivity and organize your day
          </p>
        </header>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="p-8">
              <div className="grid gap-8 lg:grid-cols-5">
                {/* Task Input Section */}
                <div className="lg:col-span-2">
                  <div className="sticky top-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Add New Task</h2>
                    <TaskInput 
                      onAddTask={handleAddTask}
                      isLoading={state.isLoading}
                    />
                  </div>
                </div>

                {/* Task List Section */}
                <div className="lg:col-span-3">
                  <TaskList
                    tasks={state.tasks}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onToggleTask={handleToggleTask}
                    isLoading={state.isLoading && state.tasks.length === 0}
                    error={state.error}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 px-8 py-4 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
                <div className="mb-2 sm:mb-0">
                  Built with React, TypeScript, and Tailwind CSS
                </div>
                <div className="flex items-center space-x-4">
                  <span>TaskPilot v1.0</span>
                  <span>•</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deletion Timer */}
        {pendingDeletion && (
          <DeletionTimer
            taskId={pendingDeletion.taskId}
            taskTitle={pendingDeletion.taskTitle}
            onConfirmDelete={confirmDeleteTask}
            onAbortDelete={abortDeleteTask}
            duration={5000}
          />
        )}

        {/* Toast Container */}
        <ToastContainer />

        {/* Global Error Display */}
        {state.error && (
          <div className="fixed bottom-4 right-4 max-w-sm">
            <div className="bg-red-900 border border-red-600 rounded-lg p-4 shadow-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-red-200 text-sm">{state.error}</p>
                  <button
                    onClick={() => setState(prev => ({ ...prev, error: null }))}
                    className="text-red-400 hover:text-red-300 text-xs mt-1 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
