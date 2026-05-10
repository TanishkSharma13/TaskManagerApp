# Task Manager Application

A full-stack Task Management Web Application built using the MERN stack with Role-Based Access Control (RBAC).  
The platform allows admins to manage projects and tasks while members can track and update assigned tasks.

---

# Features

## Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (Admin / Member)

---

## Admin Features
- Create Projects
- View All Projects
- Create Tasks
- Assign Tasks to Members
- View All Tasks
- Dashboard Analytics

---

## Member Features
- View Assigned Projects
- View Assigned Tasks
- Update Task Status
- Personalized Dashboard

---

# Dashboard Statistics
- Total Tasks
- Completed Tasks
- Pending Tasks
- In Progress Tasks
- Overdue Tasks

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Folder Structure

```bash
taskManager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <your-repo-link>
cd taskManager
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start Backend

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Routes

## Authentication Routes

| Method | Route | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/members` | Get All Members |

---

## Project Routes

| Method | Route | Description |
|--------|------|-------------|
| GET | `/api/projects` | Get Projects |
| POST | `/api/projects` | Create Project |

---

## Task Routes

| Method | Route | Description |
|--------|------|-------------|
| GET | `/api/tasks` | Get Tasks |
| POST | `/api/tasks` | Create Task |
| PATCH | `/api/tasks/:id/status` | Update Task Status |

---

# UI Features

- Modern Dark Dashboard UI
- Responsive Layout
- Sidebar Navigation
- Animated Cards
- Status Badges
- Loading States
- Empty States
- Protected Frontend Routes

---

# Future Improvements

- Google OAuth Authentication
- Team Collaboration Features
- File Attachments
- Real-Time Notifications
- Activity Logs
- Advanced Analytics

---

# Author

Developed by Tanishk Sharma