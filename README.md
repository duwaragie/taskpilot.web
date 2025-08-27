# 🚀 TaskPilot Web - Advanced React Todo Application

A modern, feature-rich todo application built with React 18, TypeScript, and Tailwind CSS. TaskPilot combines elegant design with powerful functionality to help you manage tasks efficiently.

![TaskPilot Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-blue)

## ✨ Features

### 🎯 Core Functionality
- **CRUD Operations**: Create, read, update, and delete tasks
- **Real-time API Integration**: Uses JSONPlaceholder API with localStorage fallback
- **Task Status Management**: Toggle between pending and completed states
- **Smart Timer Deletion**: 5-second countdown with abort option for accidental deletions

### 🎨 User Experience
- **Dark/Light Mode Toggle**: Enhanced theme switcher with smooth transitions
- **Side-by-Side Layout**: Pending tasks on left, completed tasks on right
- **Real-time Search & Filter**: Instant task filtering by text and status
- **Toast Notifications**: User feedback for all actions (add, edit, delete, toggle)
- **Auto-scroll**: Automatic scrolling to newly added tasks
- **Hidden Scrollbars**: Clean interface with custom scrollbar styling

### 🔥 Advanced Features
- **Cross-Section Drag & Drop**: Drag tasks between pending and completed sections
- **Same-Section Reordering**: Reorder tasks within their current status
- **localStorage Persistence**: All changes persist across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Professional transitions and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2.0** - Latest React with concurrent features
- **TypeScript 5.0.0** - Type-safe development
- **Vite 4.5.14** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Custom CSS** - Hidden scrollbars and smooth animations
- **Responsive Grid Layout** - Mobile-first design approach

### State Management & APIs
- **React Context API** - Theme and toast state management
- **Custom Hooks** - Reusable logic for localStorage and API calls
- **JSONPlaceholder API** - RESTful API for task operations
- **localStorage** - Client-side persistence and offline functionality

### Drag & Drop
- **@dnd-kit/core** - Modern drag and drop library
- **@dnd-kit/sortable** - Sortable list functionality
- **@dnd-kit/utilities** - Helper utilities for array manipulation

## 📦 Project Structure

```
taskpilot.web/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── DroppableSection.tsx     # Drag & drop zones
│   │   ├── SearchFilter.tsx         # Search and filter UI
│   │   ├── SortableTaskItem.tsx     # Individual draggable tasks
│   │   ├── TaskForm.tsx             # Add/edit task form
│   │   ├── TaskList.tsx             # Side-by-side task layout
│   │   ├── ThemeToggle.tsx          # Enhanced theme switcher
│   │   └── ToastContainer.tsx       # Notification system
│   ├── contexts/
│   │   ├── ThemeContext.tsx         # Dark/light mode management
│   │   └── ToastContext.tsx         # Toast notification system
│   ├── services/
│   │   └── api.ts                   # API integration layer
│   ├── types/
│   │   └── task.ts                  # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts               # localStorage utilities
│   ├── App.tsx                      # Main application component
│   ├── index.css                    # Global styles and scrollbar hiding
│   └── main.tsx                     # Application entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16.0.0 or higher)
- **npm** (version 8.0.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskpilot.web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/` to see the application

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production (Vercel-optimized)
npm run build:local  # Build with type checking for local development
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint for code quality checks
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment with automatic builds and deployments.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Deploy with default settings (no custom configuration needed)

3. **Automatic Configuration**
   - Vercel auto-detects Vite framework
   - Uses `npm run build` command automatically
   - Output directory: `dist` (detected automatically)
   - Node.js version: Specified in `.nvmrc` and `package.json` engines

### Other Platforms
- **Netlify**: Upload `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions with Vite deployment workflow
- **Firebase Hosting**: Use `firebase deploy` after building

### Deployment Troubleshooting
- **Permission Error**: Let Vercel auto-detect Vite framework instead of custom build commands
- **Build Failed**: Ensure all dependencies are in `package.json` and Node.js version is 18+
- **404 on Refresh**: Configure SPA fallback for client-side routing (Vercel handles this automatically for Vite)

## 🔧 API Configuration

### JSONPlaceholder Integration
The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock REST API:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints Used**:
  - `GET /todos` - Fetch initial tasks
  - `POST /todos` - Create new task
  - `PUT /todos/:id` - Update task
  - `DELETE /todos/:id` - Delete task

### API Service Layer (`src/services/api.ts`)
```typescript
// Centralized API calls with error handling
export const fetchTasks = async (): Promise<Task[]>
export const createTask = async (text: string): Promise<Task>
export const updateTask = async (id: number, text: string): Promise<Task>
export const deleteTask = async (id: number): Promise<void>
export const toggleTaskComplete = async (id: number): Promise<void>
```

### Offline Functionality
- **localStorage Fallback**: All operations persist locally when API is unavailable
- **Automatic Sync**: Changes sync with API when connection is restored
- **Consistent Experience**: Seamless operation regardless of network status

## 🎨 Design Decisions

### Theme System
- **Context-Based**: Uses React Context for global theme state
- **Persistent**: Theme preference saved to localStorage
- **System Detection**: Automatically detects user's system preference
- **Enhanced Toggle**: Larger, more interactive theme switcher with hover effects

### Layout Architecture
- **Side-by-Side Design**: Improves visual organization and workflow
- **Responsive Grid**: Adapts to different screen sizes gracefully
- **Hidden Scrollbars**: Maintains clean aesthetic while preserving functionality

### Drag & Drop Implementation
- **Modern Library**: Uses @dnd-kit for accessibility and performance
- **Cross-Section Support**: Intuitive task status changes via drag and drop
- **Visual Feedback**: Purple highlight zones and smooth animations
- **Keyboard Accessible**: Full keyboard navigation support

### State Management Strategy
- **Lifting State Up**: Main state in App.tsx with prop drilling
- **Context for Global State**: Theme and toasts use Context API
- **Local Persistence**: Critical data saved to localStorage immediately
- **Optimistic Updates**: UI updates immediately for better UX

## 🔄 Data Flow

### Task Operations
1. **User Action** → Component Event Handler
2. **API Call** → JSONPlaceholder endpoint
3. **State Update** → React state management
4. **localStorage Sync** → Immediate persistence
5. **UI Update** → Re-render with new data
6. **Toast Notification** → User feedback

### Drag & Drop Flow
1. **Drag Start** → Capture active task
2. **Drag Over** → Visual feedback on drop zones
3. **Drop** → Determine if reordering or status change
4. **State Update** → Either reorder array or toggle status
5. **Persistence** → Save to localStorage and sync with API

## 🎯 Known Limitations & Future Improvements

### Current Limitations
- **API Constraints**: JSONPlaceholder doesn't persist changes server-side
- **Single User**: No authentication or multi-user support
- **Basic Validation**: Limited input validation and error boundaries
- **Mobile Drag**: Drag and drop could be enhanced for touch devices

### Planned Improvements
- **Backend Integration**: Connect to real database with user authentication
- **Task Categories**: Add tags, priorities, and due dates
- **Collaboration**: Multi-user support with real-time updates
- **Bulk Operations**: Select multiple tasks for batch operations
- **Export/Import**: JSON/CSV export and import functionality
- **Keyboard Shortcuts**: Power user shortcuts for common actions
- **Progressive Web App**: Service worker for offline functionality
- **Task Analytics**: Completion statistics and productivity insights

### Performance Optimizations
- **Virtual Scrolling**: For handling large task lists
- **Debounced Search**: Optimize search performance
- **Memoization**: React.memo for expensive components
- **Code Splitting**: Lazy load components for faster initial load

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow existing TypeScript and React patterns
2. **Testing**: Add tests for new functionality
3. **Documentation**: Update README for significant changes
4. **Accessibility**: Maintain ARIA labels and keyboard navigation

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: updating build tasks, package updates
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **JSONPlaceholder** - Free REST API for testing and prototyping
- **@dnd-kit** - Modern drag and drop library for React
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Team** - For the amazing React framework

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

For questions or support, please open an issue on the repository.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid styling
- 📝 **CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Task Completion**: Toggle task completion status
- 🔍 **Input Validation**: Basic form validation for task creation
- 📊 **Progress Tracking**: Visual progress bar and task statistics
- 🌐 **API Ready**: Prepared for REST API integration

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React useState hooks
- **Icons**: Heroicons (SVG)

## Project Structure

```
src/
├── components/           # React components
│   ├── TaskInput.tsx    # Input field and Add button
│   ├── TaskItem.tsx     # Individual task card
│   └── TaskList.tsx     # Task list container
├── types/               # TypeScript type definitions
│   └── index.ts         # Task and API types
├── utils/               # Utility functions
│   └── api.ts           # API functions (mocked)
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Components Overview

### App Component
- Main layout and container
- State management for tasks, loading, and error states
- Handles all CRUD operations
- Purple gradient background with centered dark card

### TaskInput Component
- Dark-themed input field with placeholder "What is the task today?"
- Purple/violet "Add Task" button with hover effects
- Input validation (required, min/max length)
- Character counter and input tips
- Loading state during task creation

### TaskList Component
- Displays tasks separated by completion status
- Empty state with helpful message
- Progress bar showing completion percentage
- Task statistics (total, completed, remaining)
- Loading and error state handling

### TaskItem Component
- Rounded purple/violet task cards with white/light text
- Edit and delete icons aligned to the right
- Inline editing with save/cancel actions
- Checkbox for toggling completion
- Gradient background from purple to violet
- Completion date display

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskpilot.web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application now uses **JSONPlaceholder** (https://jsonplaceholder.typicode.com) for realistic API interactions:

- `GET /todos` - Fetch all tasks (limited to first 10)
- `POST /todos` - Create a new task
- `PUT /todos/:id` - Update an existing task
- `DELETE /todos/:id` - Delete a task
- `PATCH /todos/:id` - Toggle task completion

JSONPlaceholder provides a free fake REST API that responds with real HTTP responses, making it perfect for prototyping and testing. The API functions are located in `src/utils/api.ts`.

### Key Features:
- **Real HTTP requests** - No more mock data!
- **English task titles** - Latin titles from JSONPlaceholder are replaced with meaningful English task names
- **Error handling** - Proper HTTP status code handling
- **Type safety** - Full TypeScript support
- **Realistic delays** - Natural network response times
- **Cross-origin support** - CORS enabled by default

### Task Title Translation:
Since JSONPlaceholder returns Latin/Lorem Ipsum style titles, we've implemented a translation layer that maps the API responses to meaningful English task titles like:
- "Complete project documentation"
- "Review and test new features"  
- "Schedule team meeting for next week"
- "Update website content and design"
- And more realistic, actionable task names...

To switch to your own API later:
1. Update the `API_BASE_URL` constant in `src/utils/api.ts`
2. Remove the `englishTaskTitles` mapping if not needed
3. Modify the request/response mapping as needed
4. Add authentication headers if required

## State Management

The application uses React's built-in `useState` for local state management:

```typescript
interface AppState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}
```

For larger applications, consider upgrading to:
- Redux Toolkit
- Zustand
- React Query/TanStack Query
- SWR

## Styling

The application uses Tailwind CSS with a purple/violet color scheme:

- **Background**: `bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900`
- **Cards**: `bg-gray-900` with `border-gray-700`
- **Buttons**: `bg-gradient-to-r from-purple-600 to-violet-600`
- **Task Items**: `bg-gradient-to-r from-purple-900 to-violet-900`

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Search and filtering
- [ ] Drag and drop reordering
- [ ] Data persistence (localStorage/API)
- [ ] Offline support with PWA
- [ ] Task sharing and collaboration
- [ ] Export functionality
- [ ] Dark/light mode toggle

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
