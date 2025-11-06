import { mockAPI } from './mockApi';

// Use mock API for static deployment (no backend needed)
// Auth API
export const authAPI = {
  register: (userData) => mockAPI.auth.register(userData),
  login: (credentials) => mockAPI.auth.login(credentials),
  getMe: () => mockAPI.auth.getMe(),
};

// Suppliers API
export const suppliersAPI = {
  getAll: () => mockAPI.suppliers.getAll(),
  getById: (id) => mockAPI.suppliers.getById(id),
  create: (supplierData) => mockAPI.suppliers.create(supplierData),
  update: (id, supplierData) => mockAPI.suppliers.update(id, supplierData),
  delete: (id) => mockAPI.suppliers.delete(id),
};

// Warehouses API
export const warehousesAPI = {
  getAll: () => mockAPI.warehouses.getAll(),
  getById: (id) => mockAPI.warehouses.getById(id),
  create: (warehouseData) => mockAPI.warehouses.create(warehouseData),
  update: (id, warehouseData) => mockAPI.warehouses.update(id, warehouseData),
  delete: (id) => mockAPI.warehouses.delete(id),
};

export default mockAPI;
