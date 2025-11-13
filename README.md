

> Full-stack MERN project -FitBuddy

---

## Overview

A fitness tracking platform where:
- **Users** can track workouts and nutrition
- **Trainers** can manage clients and programs  
- **Admins** can oversee the platform


---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

##  Wireframes

Check out my designs in `Week1-Deliverables/1-Wireframes/`:
- Login Page
- Dashboard  
- Enter Stats
- History
- Trainer Page
- Admin Page


---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

##  Tech Stack 

**Frontend:** React + Vite  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**Auth:** JWT  


---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

##  Libraries and Packages
This project uses the MERN stack (MongoDB, Express, React, Node.js) with supporting libraries for authentication, API handling, and visualization.

### Frontend

React.js – Component-based UI framework

React Router DOM – Page routing and navigation

Axios – For API requests to backend

Redux Toolkit  – For state management 
Tailwind CSS / Bootstrap – For responsive and clean UI



### Backend

Node.js – JavaScript runtime environment

Express.js – Backend framework for REST APIs

Mongoose – MongoDB object modeling and schema management

JWT (jsonwebtoken) – User authentication and token management

Bcrypt.js – Password hashing

Dotenv – Environment variable management

Cors – Cross-origin resource sharing configuration

### Database & Hosting

MongoDB Atlas – Cloud-based NoSQL database

Render / Vercel – Deployment platforms for backend and frontend respectively

### Development Utilities

Nodemon – Auto-restart server during development

Postman – For API testing

Git & GitHub – Version control and project collaboration

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

## Project Architecture Overview

The FitBuddy app follows the MERN architecture — a modular, full-stack JavaScript design that separates concerns between frontend, backend, and database.

[ React Frontend ]  ⇄  [ Express + Node Backend ]  ⇄  [ MongoDB Atlas Database ]
         ↑                          ↑                           ↑
     (UI & API Calls)         (Routes, Auth, Logic)        (Collections & Data)


Layer Responsibilities

Frontend (React) – Handles the user interface, authentication forms, and visualization of fitness data. Communicates with backend using REST APIs.

Backend (Express + Node.js) – Manages user authentication, CRUD operations, and business logic (e.g., calorie calculations).

Database (MongoDB Atlas) – Stores all user-related data (logs, goals, references) in collections designed for scalability and performance.

Hosting – Frontend deployed on Vercel, Backend on Render, and Database hosted on MongoDB Atlas.


---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------