# User Management System

## 📌 Project Overview
This is a **User Management System** built with **React.js**. It allows users to:
- View a paginated list of users
- Edit user details
- Delete users
- Authenticate using a mock API (Reqres.in)

## 🔧 Technologies Used
- **React.js** (State management with useReducer & Context API)
- **React Router** (Navigation & Routing)
- **Bootstrap** (UI styling)
- **Reqres.in API** (Mock API for authentication & user data)

## 🚀 Features
- **User Authentication** (Login system using Reqres.in mock API)
- **Paginated User List** (Fetches user data & displays it with pagination)
- **Edit User** (Prefilled form to edit user details)
- **Delete User** (Remove users from the list)
- **Session Management** (Session storage for authentication persistence)

## 📂 Folder Structure
```
📦 user-management-system
├── 📂 src
│   ├── 📂 components
│   │   ├── UserList.js  # Displays list of users
│   │   ├── UserEdit.js  # Edit user details
│   │   ├── Login.js     # User login page
│   ├── App.js           # Main application & routing
│   ├── reducer.js       # State management using useReducer
│   ├── index.js         # Entry point
├── 📜 README.md         # Project documentation
```

## 🛠 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/user-management-system.git
cd user-management-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Application
```sh
npm start
```
The app will run on `http://localhost:3000/`.

## 🔑 User Authentication
### Login Credentials (Mock API)
Use the following credentials to log in (as per Reqres.in API):
```sh
Email: eve.holt@reqres.in
Password: cityslicka
```

## 📌 API Endpoints (Reqres.in)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/login` | POST | Authenticate user |
| `/api/users?page=1` | GET | Fetch paginated user list |
| `/api/users/{id}` | PUT | Update user details |
| `/api/users/{id}` | DELETE | Delete user (mock) |

## 🎯 How It Works
1. **Login** with valid credentials.
2. **View Users** in a paginated list.
3. **Edit User** details using the pre-filled form.
4. **Delete Users** from the list.
5. **Logout** to end the session.

## 📜 License
This project is open-source and available under the **MIT License**.

## 🙌 Acknowledgments
- **Reqres.in** for providing a free mock API.
- **React.js Community** for powerful frontend solutions.

Happy Coding! 🚀
