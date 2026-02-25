import { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import ConfirmModal from '../../components/ConfirmModal';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ category: '', description: '' });
    const [deleteId, setDeleteId] = useState(null);

    const fetchCategories = () => API.get('/categories').then(res => { setCategories(res.data); setLoading(false); });
    useEffect(() => { fetchCategories(); }, []);

    const resetForm = () => { setForm({ category: '', description: '' }); setEditing(null); };
    const handleEdit = (c) => { setEditing(c._id); setForm({ category: c.category, description: c.description }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) { await API.put(`/categories/${editing}`, form); toast.success('Category updated'); }
            else { await API.post('/categories', form); toast.success('Category created'); }
            resetForm(); fetchCategories();
        } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    };

    const handleDelete = async () => {
        try { await API.delete(`/categories/${deleteId}`); toast.success('Category deleted'); fetchCategories(); }
        catch { toast.error('Delete failed'); }
        setDeleteId(null);
    };

    return (
        <div className="admin-page">
            <h1>Manage Categories</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <h2>{editing ? 'Edit Category' : 'Add Category'}</h2>
                <input placeholder="Category name" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
                <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary"><FiSave /> {editing ? 'Update' : 'Add'}</button>
                    {editing && <button type="button" className="btn btn-outline" onClick={resetForm}><FiX /> Cancel</button>}
                </div>
            </form>
            {loading ? <div className="loader-container"><div className="loader"></div></div> : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
                        <tbody>
                            {categories.map(c => (
                                <tr key={c._id}>
                                    <td><strong>{c.category}</strong></td>
                                    <td>{c.description}</td>
                                    <td>
                                        <button className="icon-btn" onClick={() => handleEdit(c)}><FiEdit2 /></button>
                                        <button className="icon-btn danger" onClick={() => setDeleteId(c._id)}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Category"
                message="Are you sure you want to delete this category? Products under this category may be affected."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default ManageCategories;
