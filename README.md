# 🎉 Event Management Platform

A full-stack web application that allows users to explore events, register for them, and enables administrators to manage events and participants.

---

## 🚀 Features

### 👤 User Side
- View all available events
- View event details
- Register for events

### 🛠️ Admin Side
- Add new events
- Delete events
- View participant registrations
- Delete registrations

---

## 🏗️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## 📂 Project Structure
Event_Registration/
│
├── frontend/
│ ├── index.html
│ ├── events.html
│ ├── events-details.html
│ ├── register.html
│ ├── admin.html
│ ├── admin-events.html
│ ├── css/
│ └── js/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ └── routes/
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/event-platform.git
cd event-platform

Install backend dependencies
cd backend
npm install

Create a MySQL database:

CREATE DATABASE event_platform;

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  date DATE,
  location VARCHAR(255),
  description TEXT
);

CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  event_id INT,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

Start the backend server
node server.js

Server runs on:
http://localhost:3000

Open the frontend
Open index.html in your browser.

API Endpoints
Events
GET /events → Get all events
POST /events → Add new event
DELETE /events/:id → Delete event
Registrations
GET /registrations → Get all registrations
POST /registrations → Register user
DELETE /registrations/:id → Delete registration