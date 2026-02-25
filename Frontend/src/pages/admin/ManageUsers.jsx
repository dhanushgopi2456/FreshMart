import { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';
import { FiTrash2, FiShield } from 'react-icons/fi';
import ConfirmModal from '../../components/ConfirmModal';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const fetchUsers = () => API.get('/admin/users').then(res => { setUsers(res.data); setLoading(false); });
    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async () => {
        try { await API.delete(`/admin/users/${deleteId}`); toast.success('User deleted'); fetchUsers(); }
        catch { toast.error('Delete failed'); }
        setDeleteId(null);
    };

    return (
        <div className="admin-page">
            <h1>Manage Users</h1>
            {loading ? <div className="loader-container"><div className="loader"></div></div> : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u.firstname} {u.lastname}</td>
                                    <td>@{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.isAdmin ? <span className="admin-tag"><FiShield /> Admin</span> : 'User'}</td>
                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {!u.isAdmin && <button className="icon-btn danger" onClick={() => setDeleteId(u._id)}><FiTrash2 /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete User"
                message="Are you sure you want to delete this user? All their data will be permanently removed."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default ManageUsers;
