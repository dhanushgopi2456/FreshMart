import { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';

const statusColors = { Pending: '#f59e0b', Confirmed: '#3b82f6', Shipped: '#8b5cf6', Delivered: '#10b981', Cancelled: '#ef4444' };

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetchOrders = () => API.get('/orders').then(res => { setOrders(res.data); setLoading(false); });
    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success(`Order updated to ${status}`);
            fetchOrders();
        } catch { toast.error('Update failed'); }
    };

    const filtered = filter ? orders.filter(o => o.status === filter) : orders;

    return (
        <div className="admin-page">
            <h1>Manage Orders</h1>
            <div className="filter-tabs">
                {['', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                    <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                        {s || 'All'} {s ? `(${orders.filter(o => o.status === s).length})` : `(${orders.length})`}
                    </button>
                ))}
            </div>
            {loading ? <div className="loader-container"><div className="loader"></div></div> : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                        <tbody>
                            {filtered.map(o => (
                                <tr key={o._id}>
                                    <td>#{o._id.slice(-8).toUpperCase()}</td>
                                    <td>{o.user?.firstname} {o.user?.lastname}<br /><small>{o.user?.email}</small></td>
                                    <td>{o.products.length}</td>
                                    <td>₹{o.totalPrice?.toFixed(2)}</td>
                                    <td>{o.paymentMethod}</td>
                                    <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} className="status-select">
                                            {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
