const Category = require('../models/Category');

// GET /api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ category: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/categories/:id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/categories (Admin)
const createCategory = async (req, res) => {
    try {
        const { category, description, image } = req.body;
        const exists = await Category.findOne({ category });
        if (exists) return res.status(400).json({ message: 'Category already exists' });
        const cat = await Category.create({ category, description, image });
        res.status(201).json(cat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/categories/:id (Admin)
const updateCategory = async (req, res) => {
    try {
        const { category, description, image } = req.body;
        const cat = await Category.findById(req.params.id);
        if (cat) {
            cat.category = category || cat.category;
            cat.description = description || cat.description;
            cat.image = image || cat.image;
            const updated = await cat.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/categories/:id (Admin)
const deleteCategory = async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id);
        if (cat) {
            await Category.deleteOne({ _id: req.params.id });
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
