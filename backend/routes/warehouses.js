const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Warehouse = require('../models/Warehouse');
const auth = require('../middleware/auth');

// @route   GET /api/warehouses
// @desc    Get all warehouses
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const warehouses = await Warehouse.find().populate('createdBy', 'username email').sort({ createdAt: -1 });
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/warehouses/:id
// @desc    Get warehouse by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id).populate('createdBy', 'username email');
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    
    res.json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/warehouses
// @desc    Create a new warehouse
// @access  Private
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Warehouse name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('capacity').isNumeric().withMessage('Capacity must be a number'),
  body('manager').notEmpty().withMessage('Manager name is required'),
  body('contact').notEmpty().withMessage('Contact is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, location, capacity, currentStock, manager, contact, status } = req.body;

    const warehouse = new Warehouse({
      name,
      location,
      capacity,
      currentStock: currentStock || 0,
      manager,
      contact,
      status: status || 'operational',
      createdBy: req.user.id
    });

    await warehouse.save();
    
    res.status(201).json({
      message: 'Warehouse created successfully',
      warehouse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/warehouses/:id
// @desc    Update warehouse
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, location, capacity, currentStock, manager, contact, status } = req.body;

    const warehouse = await Warehouse.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Update fields
    if (name) warehouse.name = name;
    if (location) warehouse.location = location;
    if (capacity !== undefined) warehouse.capacity = capacity;
    if (currentStock !== undefined) warehouse.currentStock = currentStock;
    if (manager) warehouse.manager = manager;
    if (contact) warehouse.contact = contact;
    if (status) warehouse.status = status;

    await warehouse.save();
    
    res.json({
      message: 'Warehouse updated successfully',
      warehouse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/warehouses/:id
// @desc    Delete warehouse
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    await warehouse.deleteOne();
    
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
