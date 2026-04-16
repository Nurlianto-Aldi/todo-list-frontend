# 📓 Djournal-List

[![Live Demo](https://img.shields.io/badge/Live_Demo-djournal--list.vercel.app-4E6851?style=for-the-badge)](https://djournal-list.vercel.app/)

Djournal-List is a minimalist, high-performance task management application inspired by the Bullet Journaling (BuJo) methodology. Designed to reduce friction and gamify daily productivity, this app is the digital translation of my personal journaling system.  

While currently focusing on core task management capabilities, the architecture is built to scale towards a complete digital bullet journal ecosystem.  

## 🔗 Project Repositories
This project adopts a microservices-inspired architecture, separating the client interface from the API logic:
* **Frontend Repository:** You are here.
* **Backend Repository:** https://github.com/Nurlianto-Aldi/todo-list-backend

## ✨ Highlight Features

* 🚀 **Optimistic UI Updates:** Experience zero-latency interactions. Checking, editing, or deleting tasks updates the UI instantly before the server responds, ensuring a fluid user experience. Automatic state rollbacks are implemented to handle unexpected network failures.
* 🥷 **Dual-Engine Guest Mode:** Eliminates onboarding friction. Users can immediately manage tasks locally using browser `localStorage` without creating an account.
* 🔄 **Seamless Local Sync:** When a guest decides to register for an account, all their local tasks are securely and automatically synchronized to the PostgreSQL cloud database.
* 🔐 **Secure Authentication:** JWT-based user authentication with strictly protected routes.

## 🛠️ Tech Stack & Engineering Practices

**Frontend (Client)**
* **React + Vite:** For a blazing-fast development environment and optimized production build.
* **Tailwind CSS:** Utility-first styling to maintain a consistent, retro-minimalist design system.
* **React Router DOM:** Client-side routing and protected navigation.

**Architecture Decisions**
* **Separation of Concerns:** Business logic (Authentication and CRUD operations) is decoupled from UI components using Custom Hooks (`useTasks`, `useAuth`), ensuring clean, maintainable, and readable code.

**Backend (API & Database)**
* Node.js, Express.js, PostgreSQL (Hosted on Koyeb).

## 💻 Local Development Setup

If you want to run this project locally, follow these steps. (Note: You will also need to set up the Backend repository).

1. Clone the repository:
  ```
    git clone [https://github.com/Nurlianto-Aldi/todo-list-frontend.git](https://github.com/Nurlianto-Aldi/todo-list-frontend.git)
  ```
2. Navigate into the directory and install dependencies:
  ```
    cd todo-list-frontend
    npm install
  ```
3. Create a `.env` file in the root directory and define your Backend API URL:
  ```
    VITE_API_URL=http://localhost:your_backend_port
  ```
4. Start the development server
  ```
    npm run dev
  ```
  
## About the Developer
Built with focus and coffee by [Nurlianto Aldi](https://www.google.com/search?q=https://www.linkedin.com/in/nurlianto-aldi). Transitioning from NGO Project Management to Software Engineering, bringing strategic thinking and user-centric design into code.