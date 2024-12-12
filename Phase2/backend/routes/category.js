// backend/routes/categories.js

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// @route   POST /api/categories
// @desc    Create a new category
// @access  Public (since authentication is mocked)
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    // Basic validation
    if (!name) {
        return res.status(400).json({ msg: 'Category name is required' });
    }

    try {
        // Check if category already exists
        let existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        const newCategory = new Category({
            name: name.trim(),
            description: description ? description.trim() : '',
        });

        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/categories/:id
// @desc    Get a single category by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/categories/:id
// @desc    Update a category by ID
// @access  Public
router.put('/:id', async (req, res) => {
    const { name, description } = req.body;

    // Build category object
    const categoryFields = {};
    if (name) categoryFields.name = name.trim();
    if (description) categoryFields.description = description.trim();

    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Check if the new name already exists
        if (name && name.trim() !== category.name) {
            let existingCategory = await Category.findOne({ name: name.trim() });
            if (existingCategory) {
                return res.status(400).json({ msg: 'Category name already exists' });
            }
        }

        category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: categoryFields },
            { new: true }
        );

        res.json(category);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category by ID
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Optional: Check if any questions are associated with this category
        const questions = await require('../models/Question').find({ category: req.params.id });
        if (questions.length > 0) {
            return res.status(400).json({ msg: 'Cannot delete category. There are questions associated with it.' });
        }

        await Category.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Category removed' });
    } catch (err) { 
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;