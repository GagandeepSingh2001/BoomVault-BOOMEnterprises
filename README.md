# BoomVault

BoomVault is a full-stack video platform prototype that allows creators to upload short-form and long-form videos, engage users with a unified scrollable feed, simulate video purchases, and manage user interactions through comments.A next-generation social streaming platform blending short-form and long-form video with robust community and monetization features.

---

![image](https://github.com/user-attachments/assets/9b0f9b63-6d83-4010-a4b7-34dcf99074d9)


## 🚀 Tech Stack

- **Frontend:**  
  - ReactJS  
  - Tailwind CSS  
  - React Hooks (`useState`, `useEffect`)  
  - Fetch API

- **Backend:**  
  - Node.js  
  - Express.js  
  - MongoDB Atlas  
  - Mongoose  
  - dotenv (for environment variables)

- **Storage:**  
  - Local file system (for short-form videos)  
  - Express static middleware for serving video files

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)  
- MongoDB Atlas account  
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/GagandeepSingh2001/BoomVault-BOOMEnterprises.git
cd BoomVault-BOOMEnterprises
```

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```
Create a .env file in the backend directory and add your MongoDB connection string:
```
MONGO_URI=your_mongodb_connection_string
```

Start the backend:
```
node server.js
```

🔐 Environment Variables (.env file):
```
MONGO_URI – Your MongoDB Atlas connection string.
```

## 3. Frontend Setup

Navigate to the frontend directory:

```
cd ../frontend
```
Install dependencies:

```
npm install
```
Start the frontend development server:

```
npm run dev
```


## 📚 API Documentation

---

### 🔐 1. User Authentication

#### 📩 POST `/api/auth/`  
Registers a new user.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

### 🎥 2. Video Upload API

#### 📤 POST `/api/upload`  
Allows authenticated users to upload videos (either short-form with file upload or long-form via a URL).

---

**Headers:**

```http
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

🔐 Environment Variables (.env file):
```
JWT_ACCESS_TOKEN – Your super secure key.
```
