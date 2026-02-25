import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import useScrollReveal from '../hooks/useScrollReveal';
import { FiStar, FiShoppingCart, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const reviewsRef = useScrollReveal();

    useEffect(() => {
        API.get(`/products/${id}`).then(res => { setProduct(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) { toast.info('Please login to add items to cart'); return; }
        try {
            await addToCart(product._id, quantity);
            toast.success(`${product.name} added to cart!`);
        } catch { toast.error('Failed to add to cart'); }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/products/${id}/reviews`, { rating, comment });
            toast.success('Review submitted!');
            const { data } = await API.get(`/products/${id}`);
            setProduct(data);
            setComment('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        }
    };

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!product) return <div className="empty-state"><h2>Product not found</h2></div>;

    return (
        <div className="product-detail">
            <Link to="/products" className="back-link page-enter"><FiArrowLeft /> Back to Products</Link>
            <div className="product-detail-grid">
                <div className="product-detail-image hero-animate-left">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-detail-info hero-animate-right">
                    <span className="product-category-tag">{product.category?.category}</span>
                    <h1>{product.name}</h1>
                    <div className="product-detail-rating">
                        {[1, 2, 3, 4, 5].map(s => <FiStar key={s} className={`star ${s <= product.rating ? 'filled' : ''}`} />)}
                        <span>{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
                    </div>
                    <p className="product-detail-price">₹{product.price?.toFixed(2)}</p>
                    <p className="product-detail-desc">{product.description}</p>
                    <div className="stock-info">
                        {product.countInStock > 0 ? (
                            <span className="in-stock">✓ In Stock ({product.countInStock} available)</span>
                        ) : (
                            <span className="out-of-stock">✗ Out of Stock</span>
                        )}
                    </div>
                    {product.countInStock > 0 && (
                        <div className="quantity-cart-row">
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => Math.min(product.countInStock, q + 1))}><FiPlus /></button>
                            </div>
                            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                                <FiShoppingCart /> Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section reveal reveal-up" ref={reviewsRef}>
                <h2>Customer Reviews</h2>
                {user && (
                    <form className="review-form" onSubmit={handleReview}>
                        <h3>Write a Review</h3>
                        <div className="rating-input">
                            {[1, 2, 3, 4, 5].map(s => (
                                <FiStar key={s} className={`star-input ${s <= rating ? 'filled' : ''}`} onClick={() => setRating(s)} />
                            ))}
                        </div>
                        <textarea placeholder="Your review..." value={comment} onChange={e => setComment(e.target.value)} required rows={3} />
                        <button type="submit" className="btn btn-primary">Submit Review</button>
                    </form>
                )}
                <div className="reviews-list">
                    {product.reviews.length === 0 ? <p>No reviews yet. Be the first!</p> : product.reviews.map((r, i) => (
                        <div key={i} className="review-card">
                            <div className="review-header">
                                <strong>{r.name}</strong>
                                <div className="review-stars">{[1, 2, 3, 4, 5].map(s => <FiStar key={s} className={`star-sm ${s <= r.rating ? 'filled' : ''}`} />)}</div>
                            </div>
                            <p>{r.comment}</p>
                            <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
