# 🔐 Authentication API

A production-style Authentication API built with **Node.js**, **Express.js**, **MongoDB**, and **JSON Web Tokens (JWT)**.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express.js-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

This project demonstrates how modern web applications securely authenticate users through email verification, JWT authentication, password recovery, refresh tokens, protected routes, and secure logout.

The project was built as part of my backend engineering learning journey to strengthen my understanding of secure authentication systems and RESTful API development.

---

## 🚀 Features

- ✅ User Registration
- ✅ Email Validation
- ✅ Duplicate Email Detection
- ✅ Password Hashing using bcrypt
- ✅ JWT Authentication
- ✅ Access Token
- ✅ Refresh Token
- ✅ Protected Routes
- ✅ Email Verification
- ✅ Prevent Login Until Email Verification
- ✅ Forgot Password
- ✅ Reset Password
- ✅ Secure Logout
- ✅ Environment Variables
- ✅ MongoDB Integration
- ✅ Gmail SMTP using Nodemailer

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Email Service

- Nodemailer
- Gmail SMTP

### Development Tools

- Postman
- Nodemon
- dotenv
- Git
- GitHub

---

# 📁 Project Structure

```
Authentication-API/
│
├── src/
│   ├── config/
│   │     ├── db.js
│   │     └── email.js
│   │
│   ├── controllers/
│   │     └── authController.js
│   │
│   ├── middleware/
│   │     └── authMiddleware.js
│   │
│   ├── models/
│   │     └── User.js
│   │
│   ├── routes/
│   │     └── authRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Authentication-API.git
```

---

## Navigate into the project

```bash
cd Authentication-API
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

EMAIL_USER=yourgmail@gmail.com

EMAIL_PASS=your_gmail_app_password
```

---

## Run the development server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 🔑 API Endpoints

## Register User

**POST**

```
/api/auth/register
```

Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Verify Email

**GET**

```
/api/auth/verify/:token
```

Users verify their account by clicking the verification link sent to their email.

---

## Login

**POST**

```
/api/auth/login
```

Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Protected Profile

**GET**

```
/api/auth/profile
```

Headers

```
Authorization: Bearer ACCESS_TOKEN
```

---

## Forgot Password

**POST**

```
/api/auth/forgot-password
```

Body

```json
{
  "email": "john@example.com"
}
```

A password reset link is sent to the registered email.

---

## Reset Password

**POST**

```
/api/auth/reset-password/:token
```

Body

```json
{
  "password": "newpassword123"
}
```

---

## Refresh Access Token

**POST**

```
/api/auth/refresh-token
```

Body

```json
{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

Returns a brand-new Access Token.

---

## Logout

**POST**

```
/api/auth/logout
```

Body

```json
{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

Invalidates the current session by removing the Refresh Token from the database.

---

# 🔄 Authentication Flow

```
User Registration
        │
        ▼
Email Verification
        │
        ▼
User Login
        │
        ▼
Generate Access Token
Generate Refresh Token
        │
        ▼
Access Protected Routes
        │
        ▼
Access Token Expires
        │
        ▼
Refresh Token Generates New Access Token
        │
        ▼
User Continues Without Logging In Again
        │
        ▼
Logout
        │
        ▼
Refresh Token Removed From Database
```

---

# 🔒 Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Password Reset Token
- Token Expiration
- Protected Routes
- Environment Variables
- Secure Logout
- MongoDB Data Persistence

---

# 📅 Development Timeline

This project was built incrementally over **12 learning sessions**, with each day focusing on a real-world authentication feature commonly used in modern web applications.

| Day    | Feature                             | Skills Learned                                               |
| ------ | ----------------------------------- | ------------------------------------------------------------ |
| Day 1  | Project Initialization              | Node.js, Express.js, Folder Structure, Environment Variables |
| Day 2  | MongoDB Integration                 | MongoDB Atlas, Mongoose, Database Connection                 |
| Day 3  | User Registration                   | REST API, Controllers, Models, CRUD                          |
| Day 4  | Input Validation & Password Hashing | Email Validation, Duplicate Check, bcrypt                    |
| Day 5  | JWT Login                           | Authentication, Access Token Generation                      |
| Day 6  | Protected Routes                    | JWT Middleware, Route Protection                             |
| Day 7  | Profile Endpoint                    | Authorization & User Authentication                          |
| Day 8  | Email Verification                  | Crypto Tokens, Nodemailer, Gmail SMTP                        |
| Day 9  | Prevent Login Until Verified        | Email Verification Workflow                                  |
| Day 10 | Forgot & Reset Password             | Password Reset Token, Token Expiration                       |
| Day 11 | Refresh Tokens                      | Session Management, Access Token Renewal                     |
| Day 12 | Logout                              | Refresh Token Invalidation & Secure Logout                   |

---

# 🎯 Key Learning Outcomes

Through this project, I gained practical experience in:

- Building RESTful APIs with Express.js
- Designing MongoDB databases with Mongoose
- Password hashing using bcrypt
- JWT Authentication & Authorization
- Access Token and Refresh Token implementation
- Express Middleware
- Secure Authentication Flows
- Email Verification using Nodemailer
- Gmail SMTP Configuration
- Password Recovery System
- Session Management
- Environment Variables
- API Testing with Postman
- Production-style backend architecture

---

# 🚀 Future Improvements

- Role-Based Access Control (RBAC)
- Google OAuth Authentication
- Facebook Login
- Rate Limiting
- API Documentation using Swagger
- Docker Containerization
- Unit Testing
- Integration Testing
- CI/CD Pipeline
- TypeScript Migration
- NestJS Version
- AWS Deployment

---

# 👨‍💻 Author

**Augustine Grepo**

Backend Developer | MERN Stack | AWS Cloud Learner

**Portfolio**

https://augustinegrepo.vercel.app/

**GitHub**

https://github.com/augustdigiroom

**LinkedIn**

https://linkedin.com/in/augustinegrepo10

---

# ⭐ Support

If you found this project useful or inspiring, feel free to ⭐ star the repository.

Thank you for visiting my project!
