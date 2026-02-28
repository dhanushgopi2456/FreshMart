import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${search}`);
            setSearch('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">🛒</span>
                    <span className="logo-text">FreshMart</span>
                </Link>

                <form className="search-bar" onSubmit={handleSearch}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</Link>
                    {user ? (
                        <>
                            <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>Orders</Link>
                            <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                                <FiUser /> {user.firstname}
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="nav-link admin-link" onClick={() => setMenuOpen(false)}>Admin</Link>
                            )}
                            <button className="nav-link logout-btn" onClick={handleLogout}><FiLogOut /> Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                            <FiUser /> Login
                        </Link>
                    )}
                    <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
                        <FiShoppingCart />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </nav>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
        </header>
    );
};

export default Header;
