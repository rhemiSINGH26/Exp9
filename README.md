# Warehouse Logistics and Supplier Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing warehouse logistics and suppliers with secure user authentication.

## Features

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Role-based access (Admin, Manager, User)
- ✅ Protected routes

### Warehouse Management
- ✅ Create, Read, Update, Delete warehouses
- ✅ Track warehouse capacity and current stock
- ✅ Monitor warehouse status (Operational, Maintenance, Closed)
- ✅ Manage warehouse managers and contact information
- ✅ Calculate utilization percentage

### Supplier Management
- ✅ Create, Read, Update, Delete suppliers
- ✅ Track supplier contact information
- ✅ Manage products supplied
- ✅ Rate suppliers (0-5 stars)
- ✅ Track supplier status (Active, Inactive)

### Dashboard
- ✅ Overview statistics
- ✅ Total suppliers and warehouses count
- ✅ Capacity and stock monitoring
- ✅ Recent suppliers and warehouses list

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
Exp9/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Supplier.js
│   │   └── Warehouse.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── suppliers.js
│   │   └── warehouses.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Suppliers.js
│   │   │   ├── Warehouses.js
│   │   │   └── PrivateRoute.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── api.js
│   │   └── AuthContext.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/warehouse_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# For Ubuntu/Linux
sudo systemctl start mongod

# For macOS
brew services start mongodb-community

# For Windows
net start MongoDB
```

5. Start the backend server:
```bash
npm run dev
# or
npm start
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Supplier Routes (`/api/suppliers`)
- `GET /api/suppliers` - Get all suppliers (Protected)
- `GET /api/suppliers/:id` - Get supplier by ID (Protected)
- `POST /api/suppliers` - Create new supplier (Protected)
- `PUT /api/suppliers/:id` - Update supplier (Protected)
- `DELETE /api/suppliers/:id` - Delete supplier (Protected)

### Warehouse Routes (`/api/warehouses`)
- `GET /api/warehouses` - Get all warehouses (Protected)
- `GET /api/warehouses/:id` - Get warehouse by ID (Protected)
- `POST /api/warehouses` - Create new warehouse (Protected)
- `PUT /api/warehouses/:id` - Update warehouse (Protected)
- `DELETE /api/warehouses/:id` - Delete warehouse (Protected)

## Usage Guide

### 1. Register a New User
1. Open `http://localhost:3000` in your browser
2. Click "Register" in the navigation
3. Fill in the registration form:
   - Username (minimum 3 characters)
   - Email
   - Password (minimum 6 characters)
   - Role (User, Manager, or Admin)
4. Click "Register"

### 2. Login
1. Click "Login" in the navigation
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

### 3. Manage Suppliers
1. Navigate to "Suppliers" from the navigation
2. Click "+ Add Supplier" to create a new supplier
3. Fill in the supplier details:
   - Name
   - Email
   - Contact
   - Address
   - Products Supplied (comma-separated)
   - Rating (0-5)
   - Status (Active/Inactive)
4. Click "Create" to save
5. Use "Edit" or "Delete" buttons to modify existing suppliers

### 4. Manage Warehouses
1. Navigate to "Warehouses" from the navigation
2. Click "+ Add Warehouse" to create a new warehouse
3. Fill in the warehouse details:
   - Name
   - Location
   - Manager
   - Contact
   - Capacity
   - Current Stock
   - Status (Operational/Maintenance/Closed)
4. Click "Create" to save
5. Use "Edit" or "Delete" buttons to modify existing warehouses

### 5. View Dashboard
1. Navigate to "Dashboard" to see an overview:
   - Total suppliers and warehouses count
   - Active suppliers and operational warehouses
   - Total capacity and current stock
   - Recent suppliers and warehouses lists

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storing
2. **JWT Authentication**: Secure token-based authentication with configurable expiration
3. **Protected Routes**: API routes require valid JWT tokens
4. **Input Validation**: Server-side validation using express-validator
5. **CORS Protection**: Configured CORS for secure cross-origin requests
6. **Helmet.js**: Security headers to protect against common web vulnerabilities
7. **Rate Limiting**: Protection against brute-force attacks (100 requests per 15 minutes per IP)

## Testing the Application

### Sample User Registration
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Sample Supplier Data
```json
{
  "name": "Tech Supplies Inc",
  "contact": "+1234567890",
  "email": "contact@techsupplies.com",
  "address": "123 Tech Street, Silicon Valley, CA",
  "productsSupplied": ["Electronics", "Computer Parts"],
  "rating": 4.5,
  "status": "active"
}
```

### Sample Warehouse Data
```json
{
  "name": "Main Distribution Center",
  "location": "New York, NY",
  "capacity": 50000,
  "currentStock": 35000,
  "manager": "Jane Smith",
  "contact": "+1987654321",
  "status": "operational"
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- For MongoDB Atlas, ensure IP whitelist is configured

### Port Already in Use
```bash
# Find and kill the process using the port
# On Linux/Mac
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure the backend is running on port 5000
- Check proxy configuration in frontend `package.json`

## Future Enhancements

- [ ] Inventory management system
- [ ] Order tracking
- [ ] Reports and analytics
- [ ] Email notifications
- [ ] File upload for supplier/warehouse documents
- [ ] Advanced search and filtering
- [ ] Export data to CSV/PDF
- [ ] Multi-language support

## License

This project is created for educational purposes.

## Author

Created for Web Technology Lab - Experiment 9

---

**Note**: Remember to change the `JWT_SECRET` in the `.env` file before deploying to production!
