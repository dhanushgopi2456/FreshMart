import { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import ConfirmModal from '../../components/ConfirmModal';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', countInStock: '' });
    const [deleteId, setDeleteId] = useState(null);

    const fetchProducts = () => API.get('/products?limit=100').then(res => { setProducts(res.data.products); setLoading(false); });

    useEffect(() => {
        fetchProducts();
        API.get('/categories').then(res => setCategories(res.data));
    }, []);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => { setForm({ name: '', description: '', price: '', image: '', category: '', countInStock: '' }); setEditing(null); };

    const handleEdit = (p) => {
        setEditing(p._id);
        setForm({ name: p.name, description: p.description, price: p.price, image: p.image, category: p.category?._id || p.category, countInStock: p.countInStock });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await API.put(`/products/${editing}`, { ...form, price: Number(form.price), countInStock: Number(form.countInStock) });
                toast.success('Product updated');
            } else {
                await API.post('/products', { ...form, price: Number(form.price), countInStock: Number(form.countInStock) });
                toast.success('Product created');
            }
            resetForm();
            fetchProducts();
        } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/products/${deleteId}`);
            toast.success('Product deleted');
            fetchProducts();
        } catch { toast.error('Delete failed'); }
        setDeleteId(null);
    };

    return (
        <div className="admin-page">
            <h1>Manage Products</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
                <div className="input-row">
                    <input name="name" placeholder="Product name" value={form.name} onChange={onChange} required />
                    <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={onChange} required />
                </div>
                <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required rows={2} />
                <div className="input-row">
                    <input name="image" placeholder="Image URL" value={form.image} onChange={onChange} />
                    <select name="category" value={form.category} onChange={onChange} required>
                        <option value="">Select category</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.category}</option>)}
                    </select>
                    <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={onChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary"><FiSave /> {editing ? 'Update' : 'Add'}</button>
                    {editing && <button type="button" className="btn btn-outline" onClick={resetForm}><FiX /> Cancel</button>}
                </div>
            </form>

            {loading ? <div className="loader-container"><div className="loader"></div></div> : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Rating</th><th>Actions</th></tr></thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id}>
                                    <td><img src={p.image} alt="" className="table-thumb" /></td>
                                    <td>{p.name}</td>
                                    <td>₹{p.price?.toFixed(2)}</td>
                                    <td><span className={p.countInStock > 0 ? 'text-green' : 'text-red'}>{p.countInStock}</span></td>
                                    <td>{p.category?.category}</td>
                                    <td>{p.rating?.toFixed(1)}</td>
                                    <td>
                                        <button className="icon-btn" onClick={() => handleEdit(p)}><FiEdit2 /></button>
                                        <button className="icon-btn danger" onClick={() => setDeleteId(p._id)}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default ManageProducts;
