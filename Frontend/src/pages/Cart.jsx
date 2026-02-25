import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
    const { cartItems, cartTotal, loading, updateQuantity, removeFromCart } = useCart();

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    if (cartItems.length === 0) return (
        <div className="empty-state">
            <FiShoppingBag className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
    );

    return (
        <div className="cart-page">
            <h1 className="page-enter">Shopping Cart</h1>
            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map((item, idx) => (
                        <div key={item._id} className="cart-item card-animate" style={{ '--i': idx }}>
                            <img src={item.productId?.image} alt={item.productId?.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <Link to={`/products/${item.productId?._id}`}><h3>{item.productId?.name}</h3></Link>
                                <p className="cart-item-price">₹{item.productId?.price?.toFixed(2)}</p>
                            </div>
                            <div className="quantity-control">
                                <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}><FiMinus /></button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><FiPlus /></button>
                            </div>
                            <p className="cart-item-subtotal">₹{(item.productId?.price * item.quantity).toFixed(2)}</p>
                            <button className="remove-btn" onClick={() => removeFromCart(item._id)}><FiTrash2 /></button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary page-enter-delay-2">
                    <h2>Order Summary</h2>
                    <div className="summary-row"><span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span><span>₹{cartTotal.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Delivery</span><span>{cartTotal >= 500 ? 'Free' : '₹49'}</span></div>
                    <hr />
                    <div className="summary-row total"><span>Total</span><span>₹{(cartTotal + (cartTotal >= 500 ? 0 : 49)).toFixed(2)}</span></div>
                    <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
