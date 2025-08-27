export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string; // ISO 8601 format as per requirement
}

export interface TaskFormData {
  text: string;
}

export interface AppState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
