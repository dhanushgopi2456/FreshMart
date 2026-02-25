const Product = require('../models/Product');

// GET /api/products
const getProducts = async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 12 } = req.query;
        const query = {};
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        let sortObj = { dateCreated: -1 };
        if (sort === 'price_asc') sortObj = { price: 1 };
        if (sort === 'price_desc') sortObj = { price: -1 };
        if (sort === 'rating') sortObj = { rating: -1 };
        if (sort === 'newest') sortObj = { dateCreated: -1 };

        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
            .populate('category', 'category')
            .sort(sortObj)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        res.json({
            products,
            page: Number(page),
            pages: Math.ceil(count / Number(limit)),
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'category');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/products (Admin)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const product = await Product.create({
            name, description, price, image, category, countInStock,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/products/:id (Admin)
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price ?? product.price;
            product.image = image || product.image;
            product.category = category || product.category;
            product.countInStock = countInStock ?? product.countInStock;
            const updated = await product.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/products/:id (Admin)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/products/:id/reviews
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

        const review = {
            user: req.user._id,
            name: `${req.user.firstname} ${req.user.lastname}`,
            rating: Number(rating),
            comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview };
