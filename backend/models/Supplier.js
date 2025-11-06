const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Contact information is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  productsSupplied: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);
