import React, { useState, useEffect } from 'react';
import { suppliersAPI } from '../api';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    productsSupplied: '',
    rating: 0,
    status: 'active',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await suppliersAPI.getAll();
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('Failed to fetch suppliers');
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
        productsSupplied: formData.productsSupplied.split(',').map(p => p.trim()).filter(p => p),
        rating: Number(formData.rating),
      };

      if (editingSupplier) {
        await suppliersAPI.update(editingSupplier._id, submitData);
        setSuccess('Supplier updated successfully');
      } else {
        await suppliersAPI.create(submitData);
        setSuccess('Supplier created successfully');
      }

      setShowModal(false);
      setEditingSupplier(null);
      resetForm();
      fetchSuppliers();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      address: supplier.address,
      productsSupplied: supplier.productsSupplied.join(', '),
      rating: supplier.rating,
      status: supplier.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await suppliersAPI.delete(id);
        setSuccess('Supplier deleted successfully');
        fetchSuppliers();
      } catch (error) {
        setError('Failed to delete supplier');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      email: '',
      address: '',
      productsSupplied: '',
      rating: 0,
      status: 'active',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingSupplier(null);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading suppliers...</div>;
  }

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="table-container">
        <div className="table-header">
          <h3>Suppliers Management</h3>
          <button className="btn btn-small btn-success" onClick={openAddModal}>
            + Add Supplier
          </button>
        </div>

        {suppliers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Products</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.productsSupplied.join(', ') || 'N/A'}</td>
                  <td>⭐ {supplier.rating}/5</td>
                  <td>
                    <span className={`badge badge-${supplier.status}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-small"
                        onClick={() => handleEdit(supplier)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(supplier._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No suppliers found</p>
            <button className="btn btn-success" onClick={openAddModal}>
              Add Your First Supplier
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
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
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Products Supplied (comma-separated)</label>
                <input
                  type="text"
                  name="productsSupplied"
                  value={formData.productsSupplied}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Furniture, Office Supplies"
                />
              </div>
              <div className="form-group">
                <label>Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn btn-success">
                  {editingSupplier ? 'Update' : 'Create'}
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

export default Suppliers;
