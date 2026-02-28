const Order = require('../models/Order');
const AddToCart = require('../models/AddToCart');

// POST /api/orders
const placeOrder = async (req, res) => {
    try {
        const { products, totalPrice, address, paymentMethod } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        const order = await Order.create({
            user: req.user._id,
            products,
            totalPrice,
            address,
            paymentMethod: paymentMethod || 'COD',
        });
        // Clear cart after order
        await AddToCart.deleteMany({ userId: req.user._id });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/orders/my
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'firstname lastname email');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'firstname lastname email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/orders/:id/status (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            if (req.body.status === 'Delivered') {
                order.isPaid = true;
                order.paidAt = Date.now();
            }
            const updated = await order.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/orders/:id/cancel
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.status === 'Delivered') {
            return res.status(400).json({ message: 'Cannot cancel delivered order' });
        }
        order.status = 'Cancelled';
        const updated = await order.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, cancelOrder };
