import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiSave } from 'react-icons/fi';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [form, setForm] = useState({
        firstname: user?.firstname || '', lastname: user?.lastname || '',
        username: user?.username || '', email: user?.email || '', password: '',
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = { ...form };
            if (!updateData.password) delete updateData.password;
            await updateProfile(updateData);
            toast.success('Profile updated!');
            setForm({ ...form, password: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <h1 className="page-enter">My Profile</h1>
            <div className="profile-card page-enter-delay-1">
                <div className="profile-avatar">
                    <div className="avatar-circle">{user?.firstname?.[0]}{user?.lastname?.[0]}</div>
                    <h2>{user?.firstname} {user?.lastname}</h2>
                    <p>@{user?.username}</p>
                    {user?.isAdmin && <span className="admin-tag">Admin</span>}
                </div>
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="input-row">
                        <div className="input-group"><FiUser className="input-icon" /><input type="text" name="firstname" placeholder="First name" value={form.firstname} onChange={onChange} required /></div>
                        <div className="input-group"><FiUser className="input-icon" /><input type="text" name="lastname" placeholder="Last name" value={form.lastname} onChange={onChange} required /></div>
                    </div>
                    <div className="input-group"><FiUser className="input-icon" /><input type="text" name="username" placeholder="Username" value={form.username} onChange={onChange} required /></div>
                    <div className="input-group"><FiMail className="input-icon" /><input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required /></div>
                    <div className="input-group"><FiLock className="input-icon" /><input type="password" name="password" placeholder="New password (leave blank to keep)" value={form.password} onChange={onChange} /></div>
                    <button type="submit" className="btn btn-primary" disabled={loading}><FiSave /> {loading ? 'Saving...' : 'Save Changes'}</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
