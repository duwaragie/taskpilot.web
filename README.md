# TaskPilot - React Todo App

A modern, responsive Todo application built with React, TypeScript, and Tailwind CSS. Features a beautiful purple gradient design with dark theme and comprehensive task management capabilities.

## Features

- ✨ **Modern UI**: Purple gradient background with dark-themed cards
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🎯 **TypeScript**: Full type safety throughout the application
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
