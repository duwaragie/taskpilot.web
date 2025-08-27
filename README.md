# 🚀 TaskPilot Web

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.0-blue?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-brightgreen?logo=vercel" alt="Vercel" />
</p>

<p align="center">
  <b>Live Demo:</b> <a href="https://taskpilotweb.vercel.app/">https://taskpilotweb.vercel.app/</a>
</p>

A modern, feature-rich Todo app built with **React**, **TypeScript**, and **Tailwind CSS**. Includes dark/light mode, drag & drop, real API integration, and persistent storage.

---

## ✨ Features

- 📝 Add, edit, delete, and reorder tasks  
- ✅ Mark tasks as completed or pending  
- 🔀 Drag & drop between sections and reorder within sections  
- 🌗 Dark/light mode toggle  
- 🔎 Search and filter tasks  
- 🔔 Toast notifications for actions  
- ⏳ Timer-based deletion with undo  
- 📱 Responsive and accessible UI  
- 💾 Data persists in localStorage and syncs with API  
- 📊 Visual progress bar and task statistics  
- 🌐 API ready for real backend integration

---

## 🛠️ Project Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone <repository-url>
   cd taskpilot.web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Open:** [http://localhost:5173/](http://localhost:5173/)

---

## 📜 Available Scripts

| Script                | Description                                 |
|-----------------------|---------------------------------------------|
| `npm run dev`         | Start development server                    |
| `npm run build`       | Build for production                        |
| `npm run build:local` | Build with type checking for local dev      |
| `npm run preview`     | Preview production build                    |
| `npm run lint`        | Lint code                                   |

---

## 🚀 Deployment

- **Vercel:** Push to GitHub and import the repo in Vercel. No custom config needed; Vercel auto-detects Vite.
- **Netlify/Firebase:** Build with `npm run build` and deploy the `dist` folder.

---

## 🔧 API Configuration

- Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for mock REST API:
  - `GET /todos` — Fetch tasks
  - `POST /todos` — Create task
  - `PUT /todos/:id` — Update task
  - `DELETE /todos/:id` — Delete task
- All changes are also saved to localStorage for offline support

---

## 💡 Assumptions & Design Decisions

- **State Management:** React Context for theme and toast state; main task state is in App.
- **Persistence:** All state is persisted to localStorage for reliability and offline use.
- **Drag & Drop:** Implemented with @dnd-kit for accessibility and smooth UX.
- **UI/UX:** Minimal, modern, and responsive. Dark/light mode with a custom toggle.
- **API:** JSONPlaceholder for demonstration; real backend integration is planned.

---

## ⚠️ Known Limitations & Areas for Improvement

- JSONPlaceholder does not persist changes server-side (demo only)
- No authentication or multi-user support
- Limited input validation and error boundaries
- Mobile drag & drop could be improved
- Future: real backend, task categories, PWA, analytics, and more

---

## 🏗️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React useState hooks, Context
- **Icons:** Heroicons (SVG)

---

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── TaskInput.tsx    # Input field and Add button
│   ├── TaskItem.tsx     # Individual task card
│   └── TaskList.tsx     # Task list container
├── types/               # TypeScript type definitions
│   └── index.ts         # Task and API types
```

---

Happy tasking! 🎯