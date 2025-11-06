# Warehouse Logistics and Supplier Management System (Static Version)

A full-stack MERN-style application for managing warehouse logistics and suppliers with secure user authentication - **now deployed as a static site using localStorage** for data persistence.

🌐 **Live Demo**: Deploy on Render as a static site

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login with password hashing (bcryptjs)
- Role-based access (Admin, Manager, User)
- Protected routes
- Session management

### 📦 Warehouse Management
- Create, Read, Update, Delete warehouses
- Track warehouse capacity and current stock
- Monitor warehouse status (Operational, Maintenance, Closed)
- Manage warehouse managers and contact information
- Calculate utilization percentage

### 🏢 Supplier Management
- Create, Read, Update, Delete suppliers
- Track supplier contact information
- Manage products supplied
- Rate suppliers (0-5 stars)
- Track supplier status (Active, Inactive)

### 📊 Dashboard
- Overview statistics
- Total suppliers and warehouses count
- Capacity and stock monitoring
- Recent suppliers and warehouses list

## 🚀 Tech Stack

### Frontend (Static Deployment)
- **React** - UI library
- **React Router** - Navigation
- **localStorage** - Data persistence (replaces MongoDB)
- **bcryptjs** - Password hashing
- **CSS3** - Styling

## 📂 Project Structure

```
Exp9/
├── frontend/
│   ├── src/
│   │   ├── components/      ← React components
│   │   ├── mockApi.js       ← localStorage-based backend
│   │   ├── api.js           ← API interface
│   │   └── AuthContext.js   ← Authentication context
│   ├── build/               ← Production build (deploy this)
│   └── package.json
├── backend/                 ← Optional (for full-stack deployment)
└── README.md
```

## 🛠️ Installation & Setup

### Quick Start (Static Version)

1. **Clone the repository**:
```bash
git clone https://github.com/rhemiSINGH26/Exp9.git
cd Exp9/frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run in development mode**:
```bash
npm start
```

The app will open at `http://localhost:3000`

4. **Build for production**:
```bash
npm run build
```

The static files will be in the `build/` folder.

## 🌐 Deployment on Render

### Static Site Deployment (Recommended)

1. **Create New Static Site on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Static Site"
   - Connect your GitHub repository: `rhemiSINGH26/Exp9`
   - Configure:
     - **Name**: `warehouse-management`
     - **Branch**: `main`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `build`
   - Click "Create Static Site"

2. **Access Your Live Site**:
   - Render will provide a URL like: `https://warehouse-management.onrender.com`

## 📱 Usage Guide

### 1. Register a New User
1. Click "Register"
2. Fill in: Username, Email, Password, Role
3. Click "Register"

### 2. Login
1. Click "Login"
2. Enter your email and password
3. Click "Login"

### 3. Manage Suppliers & Warehouses
- Navigate using the menu
- Click "+ Add" buttons to create new entries
- Use Edit/Delete for modifications

## 🔒 Data Persistence

All data is stored in browser **localStorage**:
- Users with hashed passwords
- Suppliers
- Warehouses
- Session tokens

⚠️ **Note**: Data is stored locally. Clearing browser data will reset the app.

## 🎯 Sample Data

### Register User:
- Username: `admin`
- Email: `admin@warehouse.com`
- Password: `admin123`
- Role: `admin`

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ Token-based authentication
- ✅ Protected routes
- ✅ Input validation
- ✅ XSS protection

## 📊 Browser Compatibility

- Chrome, Firefox, Safari, Edge
- Requires localStorage support

## 👨‍💻 Author

**Rhemi Singh**
- GitHub: [@rhemiSINGH26](https://github.com/rhemiSINGH26)
- Project: Web Technology Lab - Experiment 9

---

**🎓 Created for**: Web Technology Lab - Experiment 9  
**🎯 Objective**: Secure authentication with warehouse and supplier management  
**📅 Date**: November 2025
