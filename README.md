# 🚀 SkillMentor – Full Stack Online Mentoring Platform

SkillMentor is a **modern full-stack web application** designed to connect students with expert mentors for personalized one-on-one learning sessions.

It provides a seamless experience for discovering mentors, booking sessions, and managing learning progress — all in one platform.

---

## 🌐 Live Demo

🔗 **Frontend (Vercel):**  
https://skill-mentor-fullstackapplication.vercel.app

🔗 **Backend API (Render):**  
https://skill-mentor-fullstackapplication.onrender.com

---

## 📌 Features

### 👨‍🎓 Student Features
- Browse available mentors
- View mentor profiles and expertise
- Book one-on-one sessions
- Track session history
- Join sessions via meeting links

### 👨‍🏫 Admin Features
- Manage mentors and subjects
- View all bookings
- Approve or cancel sessions
- Confirm payments
- Mark sessions as completed

---

## 🧠 Tech Stack

### 🎨 Frontend
- React.js (Vite)
- TypeScript
- Tailwind CSS
- React Router

### ⚙️ Backend
- Spring Boot (Java)
- RESTful API
- Hibernate / JPA

### 🗄️ Database
- PostgreSQL (Supabase)

### 🔐 Authentication
- Clerk (JWT-based authentication)

### ☁️ Deployment
- Frontend → Vercel
- Backend → Render
- Database → Supabase

---

## 📂 Project Structure

```text
skill-mentor-Fullstackapplication/
├── backend/
│   └── backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── pom.xml
│       └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## ⚙️ Environment Variables

### 🔧 Backend (Render / Local)

PORT=10000

SPRING_DATASOURCE_URL=your_database_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

SPRING_JPA_HIBERNATE_DDL_AUTO=update

CLERK_JWKS_URL=your_clerk_jwks_url
CLERK_ISSUER=your_clerk_issuer
CLERK_AUDIENCE=your_frontend_url

APP_CORS_ALLOWED_ORIGINS=your_frontend_url


---

### 🌐 Frontend (.env.local)

### 🔧 Backend (Render / Local)

VITE_API_BASE_URL=https://skill-mentor-fullstackapplication.onrender.com/api/v1

VITE_CLERK_PUBLISHABLE_KEY=pk_test_aGFwcHktbWFybGluLTM4LmNsZXJrLmFjY291bnRzLmRldiQ


---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Hathnagoda/skill-mentor-Fullstackapplication.git
cd skill-mentor-Fullstackapplication

2️⃣ Run Backend
cd backend/backend
./mvnw spring-boot:run
http://localhost:8080

3️⃣ Run Frontend
cd frontend
npm install
npm run dev
http://localhost:5173

🔗 API Example
GET /api/v1/mentors
POST /api/v1/sessions
GET /api/v1/sessions

🧪 Testing

Use Postman or frontend UI to test endpoints

Ensure backend is running before frontend

Check logs for debugging (Render / Console)

---


#👨‍💻 Author

Gayantha Hathnagoda

🎓 BSc Computer Science Student
💻 Full Stack Developer (React + Spring Boot)

🔗 GitHub: https://github.com/Hathnagoda



