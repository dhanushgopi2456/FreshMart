import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Footer = () => {
    const footerRef = useScrollReveal({ threshold: 0.1 });

    return (
        <footer className="footer footer-animate" ref={footerRef}>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>🛒 FreshMart</h3>
                    <p>Your one-stop shop for fresh groceries delivered to your doorstep.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Returns</a>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>📧 support@freshmart.in</p>
                    <p>📞 +91 6281716735</p>
                    <p>📍 Seetarampeta, Tadepalligudem, Andhra Pradesh, India</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Dhanush Gopi Kavala. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
