import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    return user ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    return user?.isAdmin ? children : <Navigate to="/" />;
};
