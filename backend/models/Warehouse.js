const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Warehouse name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: 0
  },
  currentStock: {
    type: Number,
    default: 0,
    min: 0
  },
  manager: {
    type: String,
    required: [true, 'Manager name is required']
  },
  contact: {
    type: String,
    required: [true, 'Contact information is required']
  },
  status: {
    type: String,
    enum: ['operational', 'maintenance', 'closed'],
    default: 'operational'
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

module.exports = mongoose.model('Warehouse', warehouseSchema);
