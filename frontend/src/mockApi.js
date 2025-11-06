// Mock API using localStorage for static deployment
import bcrypt from 'bcryptjs';

// Initialize localStorage with default data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('suppliers')) {
    localStorage.setItem('suppliers', JSON.stringify([]));
  }
  if (!localStorage.getItem('warehouses')) {
    localStorage.setItem('warehouses', JSON.stringify([]));
  }
};

// Helper to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper to compare passwords
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Helper to generate JWT-like token (simple base64 encoding for demo)
const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    iat: Date.now(),
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return btoa(JSON.stringify(payload));
};

// Helper to verify token
const verifyToken = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      throw new Error('Token expired');
    }
    return payload.user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Mock API implementation
export const mockAPI = {
  // Initialize storage
  init: () => {
    initializeStorage();
  },

  // Auth API
  auth: {
    register: async (userData) => {
      initializeStorage();
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find(
        u => u.email === userData.email || u.username === userData.username
      );
      
      if (existingUser) {
        throw new Error('User already exists with this email or username');
      }

      // Create new user
      const hashedPassword = await hashPassword(userData.password);
      const newUser = {
        id: generateId(),
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'user',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Generate token
      const token = generateToken(newUser);
      
      // Store current user
      localStorage.setItem('currentToken', token);

      return {
        data: {
          message: 'User registered successfully',
          token,
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
          }
        }
      };
    },

    login: async (credentials) => {
      initializeStorage();
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user
      const user = users.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verify password
      const isMatch = await comparePassword(credentials.password, user.password);
      
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate token
      const token = generateToken(user);
      
      // Store current user
      localStorage.setItem('currentToken', token);

      return {
        data: {
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      };
    },

    getMe: async () => {
      const token = localStorage.getItem('currentToken');
      if (!token) {
        throw new Error('No token found');
      }

      const user = verifyToken(token);
      return { data: user };
    }
  },

  // Suppliers API
  suppliers: {
    getAll: async () => {
      initializeStorage();
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      return { data: suppliers };
    },

    getById: async (id) => {
      initializeStorage();
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      const supplier = suppliers.find(s => s._id === id);
      
      if (!supplier) {
        throw new Error('Supplier not found');
      }
      
      return { data: supplier };
    },

    create: async (supplierData) => {
      initializeStorage();
      const token = localStorage.getItem('currentToken');
      const user = verifyToken(token);
      
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      
      const newSupplier = {
        _id: generateId(),
        ...supplierData,
        createdBy: user.id,
        createdAt: new Date().toISOString()
      };

      suppliers.push(newSupplier);
      localStorage.setItem('suppliers', JSON.stringify(suppliers));

      return {
        data: {
          message: 'Supplier created successfully',
          supplier: newSupplier
        }
      };
    },

    update: async (id, supplierData) => {
      initializeStorage();
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      const index = suppliers.findIndex(s => s._id === id);
      
      if (index === -1) {
        throw new Error('Supplier not found');
      }

      suppliers[index] = { ...suppliers[index], ...supplierData };
      localStorage.setItem('suppliers', JSON.stringify(suppliers));

      return {
        data: {
          message: 'Supplier updated successfully',
          supplier: suppliers[index]
        }
      };
    },

    delete: async (id) => {
      initializeStorage();
      const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
      const filtered = suppliers.filter(s => s._id !== id);
      
      if (filtered.length === suppliers.length) {
        throw new Error('Supplier not found');
      }

      localStorage.setItem('suppliers', JSON.stringify(filtered));

      return {
        data: { message: 'Supplier deleted successfully' }
      };
    }
  },

  // Warehouses API
  warehouses: {
    getAll: async () => {
      initializeStorage();
      const warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
      return { data: warehouses };
    },

    getById: async (id) => {
      initializeStorage();
      const warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
      const warehouse = warehouses.find(w => w._id === id);
      
      if (!warehouse) {
        throw new Error('Warehouse not found');
      }
      
      return { data: warehouse };
    },

    create: async (warehouseData) => {
      initializeStorage();
      const token = localStorage.getItem('currentToken');
      const user = verifyToken(token);
      
      const warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
      
      const newWarehouse = {
        _id: generateId(),
        ...warehouseData,
        createdBy: user.id,
        createdAt: new Date().toISOString()
      };

      warehouses.push(newWarehouse);
      localStorage.setItem('warehouses', JSON.stringify(warehouses));

      return {
        data: {
          message: 'Warehouse created successfully',
          warehouse: newWarehouse
        }
      };
    },

    update: async (id, warehouseData) => {
      initializeStorage();
      const warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
      const index = warehouses.findIndex(w => w._id === id);
      
      if (index === -1) {
        throw new Error('Warehouse not found');
      }

      warehouses[index] = { ...warehouses[index], ...warehouseData };
      localStorage.setItem('warehouses', JSON.stringify(warehouses));

      return {
        data: {
          message: 'Warehouse updated successfully',
          warehouse: warehouses[index]
        }
      };
    },

    delete: async (id) => {
      initializeStorage();
      const warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
      const filtered = warehouses.filter(w => w._id !== id);
      
      if (filtered.length === warehouses.length) {
        throw new Error('Warehouse not found');
      }

      localStorage.setItem('warehouses', JSON.stringify(filtered));

      return {
        data: { message: 'Warehouse deleted successfully' }
      };
    }
  }
};

// Initialize on load
mockAPI.init();
