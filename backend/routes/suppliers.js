const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

// @route   GET /api/suppliers
// @desc    Get all suppliers
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('createdBy', 'username email').sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/suppliers/:id
// @desc    Get supplier by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate('createdBy', 'username email');
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/suppliers
// @desc    Create a new supplier
// @access  Private
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Supplier name is required'),
  body('contact').notEmpty().withMessage('Contact is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('address').notEmpty().withMessage('Address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact, email, address, productsSupplied, rating, status } = req.body;

    const supplier = new Supplier({
      name,
      contact,
      email,
      address,
      productsSupplied: productsSupplied || [],
      rating: rating || 0,
      status: status || 'active',
      createdBy: req.user.id
    });

    await supplier.save();
    
    res.status(201).json({
      message: 'Supplier created successfully',
      supplier
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/suppliers/:id
// @desc    Update supplier
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, contact, email, address, productsSupplied, rating, status } = req.body;

    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Update fields
    if (name) supplier.name = name;
    if (contact) supplier.contact = contact;
    if (email) supplier.email = email;
    if (address) supplier.address = address;
    if (productsSupplied) supplier.productsSupplied = productsSupplied;
    if (rating !== undefined) supplier.rating = rating;
    if (status) supplier.status = status;

    await supplier.save();
    
    res.json({
      message: 'Supplier updated successfully',
      supplier
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/suppliers/:id
// @desc    Delete supplier
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await supplier.deleteOne();
    
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
