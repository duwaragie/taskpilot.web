import { Task } from '../types';

const STORAGE_KEY = 'taskpilot_tasks';

export const storage = {
  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  },

  loadTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const tasks = JSON.parse(stored);
      return Array.isArray(tasks) ? tasks : [];
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      return [];
    }
  },

  clearTasks: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear tasks from localStorage:', error);
    }
  },

  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};
