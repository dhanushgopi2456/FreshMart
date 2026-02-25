import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { FiPackage, FiClock } from 'react-icons/fi';

const statusColors = { Pending: '#f59e0b', Confirmed: '#3b82f6', Shipped: '#8b5cf6', Delivered: '#10b981', Cancelled: '#ef4444' };

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/orders/my').then(res => { setOrders(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    if (orders.length === 0) return (
        <div className="empty-state">
            <FiPackage className="empty-icon" />
            <h2>No orders yet</h2>
            <p>Your order history will appear here</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
    );

    return (
        <div className="orders-page">
            <h1 className="page-enter">My Orders</h1>
            <div className="orders-list">
                {orders.map((order, idx) => (
                    <Link key={order._id} to={`/orders/${order._id}`} className="order-card card-animate" style={{ '--i': idx }}>
                        <div className="order-card-header">
                            <div>
                                <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                                <span className="order-date"><FiClock /> {new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span className="order-status" style={{ background: statusColors[order.status] }}>{order.status}</span>
                        </div>
                        <div className="order-card-items">
                            {order.products.slice(0, 3).map((p, i) => (
                                <img key={i} src={p.image} alt={p.name} className="order-thumb" />
                            ))}
                            {order.products.length > 3 && <span className="more-items">+{order.products.length - 3}</span>}
                        </div>
                        <div className="order-card-footer">
                            <span>{order.products.length} item{order.products.length > 1 ? 's' : ''}</span>
                            <strong>₹{order.totalPrice?.toFixed(2)}</strong>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Orders;
