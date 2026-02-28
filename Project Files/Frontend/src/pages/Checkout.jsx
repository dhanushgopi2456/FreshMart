import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api';
import { toast } from 'react-toastify';
import { FiMapPin, FiCreditCard } from 'react-icons/fi';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '', phone: '' });
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const delivery = cartTotal >= 500 ? 0 : 49;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const products = cartItems.map(item => ({
                product: item.productId._id,
                name: item.productId.name,
                quantity: item.quantity,
                price: item.productId.price,
                image: item.productId.image,
            }));
            await API.post('/orders', { products, totalPrice: cartTotal + delivery, address, paymentMethod });
            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <h1 className="page-enter">Checkout</h1>
            <div className="checkout-layout">
                <form onSubmit={handleSubmit} className="checkout-form checkout-animate">
                    <div className="checkout-section">
                        <h2><FiMapPin /> Delivery Address</h2>
                        <div className="input-group"><input type="text" placeholder="Street address" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} required /></div>
                        <div className="input-row">
                            <div className="input-group"><input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required /></div>
                            <div className="input-group"><input type="text" placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required /></div>
                        </div>
                        <div className="input-row">
                            <div className="input-group"><input type="text" placeholder="ZIP Code" value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} required /></div>
                            <div className="input-group"><input type="tel" placeholder="Phone number" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} required /></div>
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h2><FiCreditCard /> Payment Method</h2>
                        <div className="payment-options">
                            {['COD', 'Credit Card', 'Debit Card', 'UPI'].map(m => (
                                <label key={m} className={`payment-option ${paymentMethod === m ? 'selected' : ''}`}>
                                    <input type="radio" name="payment" value={m} checked={paymentMethod === m} onChange={e => setPaymentMethod(e.target.value)} />
                                    {m}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                        {loading ? 'Placing Order...' : `Place Order — ₹${(cartTotal + delivery).toFixed(2)}`}
                    </button>
                </form>

                <div className="checkout-summary page-enter-delay-2">
                    <h2>Order Summary</h2>
                    {cartItems.map(item => (
                        <div key={item._id} className="checkout-item">
                            <img src={item.productId?.image} alt="" />
                            <div>
                                <p>{item.productId?.name}</p>
                                <span>{item.quantity} × ₹{item.productId?.price?.toFixed(2)}</span>
                            </div>
                            <strong>₹{(item.productId?.price * item.quantity).toFixed(2)}</strong>
                        </div>
                    ))}
                    <hr />
                    <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Delivery</span><span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span></div>
                    <div className="summary-row total"><span>Total</span><span>₹{(cartTotal + delivery).toFixed(2)}</span></div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
