import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiBox, FiGrid, FiList, FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            API.get('/admin/analytics'),
            API.get('/orders'),
        ]).then(([analyticsRes, ordersRes]) => {
            setAnalytics(analyticsRes.data);
            setRecentOrders(ordersRes.data.slice(0, 5));
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Here's your store overview.</p>
            </div>

            <div className="admin-nav-cards">
                <Link to="/admin/products" className="admin-nav-card"><FiBox /> Products</Link>
                <Link to="/admin/categories" className="admin-nav-card"><FiGrid /> Categories</Link>
                <Link to="/admin/orders" className="admin-nav-card"><FiList /> Orders</Link>
                <Link to="/admin/users" className="admin-nav-card"><FiUsers /> Users</Link>
            </div>

            {analytics && (
                <div className="stats-grid">
                    <div className="stat-card stat-blue"><FiUsers className="stat-icon" /><div><h3>{analytics.totalUsers}</h3><p>Total Users</p></div></div>
                    <div className="stat-card stat-green"><FiPackage className="stat-icon" /><div><h3>{analytics.totalProducts}</h3><p>Products</p></div></div>
                    <div className="stat-card stat-purple"><FiShoppingBag className="stat-icon" /><div><h3>{analytics.totalOrders}</h3><p>Orders</p></div></div>
                    <div className="stat-card stat-gold"><FiDollarSign className="stat-icon" /><div><h3>₹{analytics.totalRevenue?.toFixed(2)}</h3><p>Revenue</p></div></div>
                </div>
            )}

            {analytics && (
                <div className="order-status-chart">
                    <h2><FiBarChart2 /> Orders by Status</h2>
                    <div className="status-bars">
                        {Object.entries(analytics.ordersByStatus).map(([key, val]) => (
                            <div key={key} className="status-bar-row">
                                <span className="status-label">{key.replace('Orders', '')}</span>
                                <div className="status-bar-track">
                                    <div className="status-bar-fill" style={{ width: `${analytics.totalOrders ? (val / analytics.totalOrders) * 100 : 0}%` }}></div>
                                </div>
                                <span className="status-count">{val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {recentOrders.length > 0 && (
                <div className="recent-orders">
                    <h2>Recent Orders</h2>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                            <tbody>
                                {recentOrders.map(o => (
                                    <tr key={o._id}>
                                        <td>#{o._id.slice(-8).toUpperCase()}</td>
                                        <td>{o.user?.firstname} {o.user?.lastname}</td>
                                        <td>₹{o.totalPrice?.toFixed(2)}</td>
                                        <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
