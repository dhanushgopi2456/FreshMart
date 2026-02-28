import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product, index = 0 }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!user) { toast.info('Please login to add items to cart'); return; }
        try {
            await addToCart(product._id);
            toast.success(`${product.name} added to cart!`);
        } catch { toast.error('Failed to add to cart'); }
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card card-animate" style={{ '--i': index }}>
            <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                {product.countInStock === 0 && <span className="out-of-stock-badge">Out of Stock</span>}
            </div>
            <div className="product-info">
                <span className="product-category">{product.category?.category || 'Uncategorized'}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                    <FiStar className="star-icon" />
                    <span>{product.rating?.toFixed(1)}</span>
                    <span className="review-count">({product.numReviews})</span>
                </div>
                <div className="product-bottom">
                    <span className="product-price">₹{product.price?.toFixed(2)}</span>
                    <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.countInStock === 0}>
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
