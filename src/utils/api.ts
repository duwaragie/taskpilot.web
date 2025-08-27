import { Task, TaskFormData, ApiResponse } from '../types';

// Mock API base URL for tasks - replace with your actual API URL
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// JSONPlaceholder Todo interface (for API integration)
interface JsonPlaceholderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// English task texts to replace the Latin JSONPlaceholder titles
const englishTaskTexts = [
  'Complete project documentation',
  'Review and test new features',
  'Schedule team meeting for next week',
  'Update website content and design',
  'Prepare presentation for stakeholders',
  'Organize workspace and clean desk',
  'Call client about project requirements',
  'Research new technology trends',
  'Write blog post about recent learnings',
  'Plan weekend activities with family',
  'Review budget and financial reports',
  'Update social media profiles',
  'Learn new programming language',
  'Exercise for 30 minutes today',
  'Read industry articles and news',
  'Backup important files and documents',
  'Schedule doctor appointment',
  'Plan grocery shopping list',
  'Send thank you emails to team',
  'Practice coding interview questions'
];

// Convert JSONPlaceholder todo to our Task format with required structure
const convertToTask = (todo: JsonPlaceholderTodo, index: number): Task => ({
  id: todo.id,
  text: englishTaskTexts[index % englishTaskTexts.length] || `Task ${todo.id}`,
  completed: todo.completed,
  createdAt: new Date().toISOString(), // ISO 8601 format as required
});

// Generate a unique ID for new tasks
const generateId = () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);

/**
 * GET /tasks - Fetch all tasks (using JSONPlaceholder /todos endpoint)
 */
export const fetchTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todos: JsonPlaceholderTodo[] = await response.json();
    
    // Convert JSONPlaceholder todos to our Task format with English text (limit to first 10)
    const tasks: Task[] = todos.slice(0, 10).map((todo, index) => convertToTask(todo, index));

    return {
      data: tasks,
      success: true,
      message: 'Tasks fetched successfully from JSONPlaceholder',
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {
      data: [],
      success: false,
      message: 'Failed to fetch tasks from JSONPlaceholder',
    };
  }
};

/**
 * POST /tasks - Create a new task (using JSONPlaceholder /todos endpoint)
 */
export const createTask = async (taskData: TaskFormData): Promise<ApiResponse<Task>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskData.text, // Map text to title for JSONPlaceholder
        completed: false,
        userId: 1, // JSONPlaceholder requires userId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json(); // Consume the response but don't need the data
    
    // JSONPlaceholder returns a fake ID (usually 201), so we'll generate our own for consistency
    const newTask: Task = {
      id: generateId(),
      text: taskData.text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    return {
      data: newTask,
      success: true,
      message: 'Task created successfully via JSONPlaceholder',
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task via JSONPlaceholder');
  }
};

/**
 * PUT /tasks/:id - Update an existing task (using JSONPlaceholder /todos endpoint)
 */
export const updateTask = async (id: number, updates: Partial<Task>): Promise<ApiResponse<Task>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updates.text, // Map text to title for JSONPlaceholder
        completed: updates.completed,
        userId: 1, // JSONPlaceholder requires userId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const todo: JsonPlaceholderTodo = await response.json();

    const updatedTask: Task = {
      id,
      text: todo.title,
      completed: todo.completed,
      createdAt: updates.createdAt || new Date().toISOString(),
    };

    return {
      data: updatedTask,
      success: true,
      message: 'Task updated successfully via JSONPlaceholder',
    };
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task via JSONPlaceholder');
  }
};

/**
 * DELETE /tasks/:id - Delete a task (using JSONPlaceholder /todos endpoint)
 */
export const deleteTask = async (id: number): Promise<ApiResponse<{ id: number }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // JSONPlaceholder returns an empty object {} for successful deletions
    return {
      data: { id },
      success: true,
      message: 'Task deleted successfully via JSONPlaceholder',
    };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task via JSONPlaceholder');
  }
};

/**
 * PATCH /tasks/:id - Toggle task completion status (using JSONPlaceholder /todos endpoint)
 */
export const toggleTaskComplete = async (id: number): Promise<ApiResponse<Task>> => {
  try {
    // First, get the current task to know its current state
    const getResponse = await fetch(`${API_BASE_URL}/todos/${id}`);
    
    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }
    
    const currentTodo: JsonPlaceholderTodo = await getResponse.json();
    
    // Now update with toggled completion status
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !currentTodo.completed,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedTodo: JsonPlaceholderTodo = await response.json();

    const toggledTask: Task = {
      id,
      text: updatedTodo.title,
      completed: updatedTodo.completed,
      createdAt: new Date().toISOString(),
    };

    return {
      data: toggledTask,
      success: true,
      message: 'Task status updated successfully via JSONPlaceholder',
    };
  } catch (error) {
    console.error('Error toggling task:', error);
    throw new Error('Failed to toggle task completion via JSONPlaceholder');
  }
};
