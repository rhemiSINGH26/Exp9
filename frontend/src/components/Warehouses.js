import React, { useState, useEffect } from 'react';
import { warehousesAPI } from '../api';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    currentStock: 0,
    manager: '',
    contact: '',
    status: 'operational',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await warehousesAPI.getAll();
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setError('Failed to fetch warehouses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const submitData = {
        ...formData,
        capacity: Number(formData.capacity),
        currentStock: Number(formData.currentStock),
      };

      if (editingWarehouse) {
        await warehousesAPI.update(editingWarehouse._id, submitData);
        setSuccess('Warehouse updated successfully');
      } else {
        await warehousesAPI.create(submitData);
        setSuccess('Warehouse created successfully');
      }

      setShowModal(false);
      setEditingWarehouse(null);
      resetForm();
      fetchWarehouses();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      location: warehouse.location,
      capacity: warehouse.capacity,
      currentStock: warehouse.currentStock,
      manager: warehouse.manager,
      contact: warehouse.contact,
      status: warehouse.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this warehouse?')) {
      try {
        await warehousesAPI.delete(id);
        setSuccess('Warehouse deleted successfully');
        fetchWarehouses();
      } catch (error) {
        setError('Failed to delete warehouse');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      capacity: 0,
      currentStock: 0,
      manager: '',
      contact: '',
      status: 'operational',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingWarehouse(null);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading warehouses...</div>;
  }

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="table-container">
        <div className="table-header">
          <h3>Warehouses Management</h3>
          <button className="btn btn-small btn-success" onClick={openAddModal}>
            + Add Warehouse
          </button>
        </div>

        {warehouses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Contact</th>
                <th>Capacity</th>
                <th>Current Stock</th>
                <th>Utilization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => {
                const utilization = warehouse.capacity > 0 
                  ? Math.round((warehouse.currentStock / warehouse.capacity) * 100) 
                  : 0;
                
                return (
                  <tr key={warehouse._id}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.manager}</td>
                    <td>{warehouse.contact}</td>
                    <td>{warehouse.capacity.toLocaleString()}</td>
                    <td>{warehouse.currentStock.toLocaleString()}</td>
                    <td>{utilization}%</td>
                    <td>
                      <span className={`badge badge-${warehouse.status}`}>
                        {warehouse.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-small"
                          onClick={() => handleEdit(warehouse)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(warehouse._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No warehouses found</p>
            <button className="btn btn-success" onClick={openAddModal}>
              Add Your First Warehouse
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Current Stock</label>
                <input
                  type="number"
                  name="currentStock"
                  value={formData.currentStock}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn btn-success">
                  {editingWarehouse ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;
