import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiCheck, FiTruck, FiPackage, FiClock } from 'react-icons/fi';

const steps = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

const OrderTrack = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/orders/${id}`).then(res => { setOrder(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, [id]);

    const handleCancel = async () => {
        try {
            await API.put(`/orders/${id}/cancel`);
            toast.success('Order cancelled');
            const { data } = await API.get(`/orders/${id}`);
            setOrder(data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel');
        }
    };

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!order) return <div className="empty-state"><h2>Order not found</h2></div>;

    const currentStep = order.status === 'Cancelled' ? -1 : steps.indexOf(order.status);

    return (
        <div className="order-track-page">
            <Link to="/orders" className="back-link page-enter"><FiArrowLeft /> Back to Orders</Link>
            <div className="order-track-header page-enter-delay-1">
                <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
                <span className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
            </div>

            {order.status !== 'Cancelled' ? (
                <div className="tracking-timeline">
                    {steps.map((step, i) => (
                        <div key={step} className={`timeline-step ${i <= currentStep ? 'completed' : ''} ${i === currentStep ? 'current' : ''}`}>
                            <div className="timeline-icon">
                                {i === 0 && <FiClock />}
                                {i === 1 && <FiCheck />}
                                {i === 2 && <FiTruck />}
                                {i === 3 && <FiPackage />}
                            </div>
                            <span>{step}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="cancelled-notice">
                    <h2>🚫 Order Cancelled</h2>
                    <p>This order has been cancelled.</p>
                </div>
            )}

            <div className="order-detail-grid page-enter-delay-3">
                <div className="order-detail-section">
                    <h2>Items</h2>
                    {order.products.map((p, i) => (
                        <div key={i} className="order-detail-item">
                            <img src={p.image} alt={p.name} />
                            <div><h3>{p.name}</h3><span>{p.quantity} × ₹{p.price?.toFixed(2)}</span></div>
                            <strong>₹{(p.price * p.quantity).toFixed(2)}</strong>
                        </div>
                    ))}
                    <hr />
                    <div className="summary-row total"><span>Total</span><span>₹{order.totalPrice?.toFixed(2)}</span></div>
                </div>
                <div>
                    <div className="order-detail-section">
                        <h2>Delivery Address</h2>
                        <p>{order.address?.street}</p>
                        <p>{order.address?.city}, {order.address?.state} {order.address?.zipCode}</p>
                        <p>📞 {order.address?.phone}</p>
                    </div>
                    <div className="order-detail-section">
                        <h2>Payment</h2>
                        <p>{order.paymentMethod}</p>
                        <p>{order.isPaid ? '✅ Paid' : '⏳ Pending'}</p>
                    </div>
                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                        <button className="btn btn-danger btn-block" onClick={handleCancel}>Cancel Order</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTrack;
