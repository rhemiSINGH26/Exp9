#!/bin/bash

echo "================================================"
echo "Starting Warehouse Management System"
echo "================================================"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if pgrep -x "mongod" > /dev/null
then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB doesn't appear to be running"
    echo "   Please start MongoDB first:"
    echo "   - Linux: sudo systemctl start mongod"
    echo "   - macOS: brew services start mongodb-community"
    echo "   - Windows: net start MongoDB"
    echo ""
fi

# Start backend server
echo "🚀 Starting backend server on port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo "🚀 Starting frontend server on port 3000..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "================================================"
echo "✅ Servers started successfully!"
echo "================================================"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
wait
