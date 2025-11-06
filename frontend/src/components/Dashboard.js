import React, { useState, useEffect } from 'react';
import { suppliersAPI, warehousesAPI } from '../api';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [suppliersRes, warehousesRes] = await Promise.all([
        suppliersAPI.getAll(),
        warehousesAPI.getAll(),
      ]);
      setSuppliers(suppliersRes.data);
      setWarehouses(warehousesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0);
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const operationalWarehouses = warehouses.filter(w => w.status === 'operational').length;

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Welcome, {user?.username}!</h2>
          <p>Overview of your warehouse logistics and supplier management system</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Suppliers</h3>
            <div className="stat-value">{suppliers.length}</div>
            <p style={{ color: '#27ae60', marginTop: '0.5rem' }}>
              {activeSuppliers} active
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Warehouses</h3>
            <div className="stat-value">{warehouses.length}</div>
            <p style={{ color: '#27ae60', marginTop: '0.5rem' }}>
              {operationalWarehouses} operational
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Capacity</h3>
            <div className="stat-value">{totalCapacity.toLocaleString()}</div>
            <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>units</p>
          </div>
          <div className="stat-card">
            <h3>Current Stock</h3>
            <div className="stat-value">{totalStock.toLocaleString()}</div>
            <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
              {totalCapacity > 0 ? Math.round((totalStock / totalCapacity) * 100) : 0}% capacity
            </p>
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <div className="table-header">
            <h3>Recent Suppliers</h3>
          </div>
          {suppliers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.slice(0, 5).map((supplier) => (
                  <tr key={supplier._id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.contact}</td>
                    <td>⭐ {supplier.rating}/5</td>
                    <td>
                      <span className={`badge badge-${supplier.status}`}>
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No suppliers found</p>
            </div>
          )}
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3>Recent Warehouses</h3>
          </div>
          {warehouses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Manager</th>
                  <th>Capacity</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.slice(0, 5).map((warehouse) => (
                  <tr key={warehouse._id}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.manager}</td>
                    <td>{warehouse.capacity.toLocaleString()}</td>
                    <td>{warehouse.currentStock.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${warehouse.status}`}>
                        {warehouse.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No warehouses found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
