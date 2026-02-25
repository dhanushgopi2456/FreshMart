const AddToCart = require('../models/AddToCart');

// GET /api/cart
const getCartItems = async (req, res) => {
    try {
        const items = await AddToCart.find({ userId: req.user._id })
            .populate('productId', 'name price image countInStock');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const existing = await AddToCart.findOne({ userId: req.user._id, productId });
        if (existing) {
            existing.quantity += quantity || 1;
            const updated = await existing.save();
            return res.json(updated);
        }
        const item = await AddToCart.create({ userId: req.user._id, productId, quantity: quantity || 1 });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/cart/:id
const updateCartItem = async (req, res) => {
    try {
        const item = await AddToCart.findOne({ _id: req.params.id, userId: req.user._id });
        if (item) {
            item.quantity = req.body.quantity || item.quantity;
            const updated = await item.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/cart/:id
const removeCartItem = async (req, res) => {
    try {
        const item = await AddToCart.findOne({ _id: req.params.id, userId: req.user._id });
        if (item) {
            await AddToCart.deleteOne({ _id: req.params.id });
            res.json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/cart
const clearCart = async (req, res) => {
    try {
        await AddToCart.deleteMany({ userId: req.user._id });
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart };
