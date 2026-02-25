import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
    const [form, setForm] = useState({ firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
        setLoading(true);
        try {
            await register({ firstname: form.firstname, lastname: form.lastname, username: form.username, email: form.email, password: form.password });
            toast.success('Account created successfully! Please sign in.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-icon">🛒</span>
                    <h1>Create Account</h1>
                    <p>Join FreshMart and start shopping</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-row">
                        <div className="input-group">
                            <FiUser className="input-icon" />
                            <input type="text" name="firstname" placeholder="First name" value={form.firstname} onChange={onChange} required />
                        </div>
                        <div className="input-group">
                            <FiUser className="input-icon" />
                            <input type="text" name="lastname" placeholder="Last name" value={form.lastname} onChange={onChange} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <FiUser className="input-icon" />
                        <input type="text" name="username" placeholder="Username" value={form.username} onChange={onChange} required />
                    </div>
                    <div className="input-group">
                        <FiMail className="input-icon" />
                        <input type="email" name="email" placeholder="Email address" value={form.email} onChange={onChange} required />
                    </div>
                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input type={showPw ? 'text' : 'password'} name="password" placeholder="Password (min 6 chars)" value={form.password} onChange={onChange} required minLength={6} />
                        <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                            {showPw ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <p className="auth-footer">Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
        </div>
    );
};

export default Register;
