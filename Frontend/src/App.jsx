import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderTrack from './pages/OrderTrack';
import Profile from './pages/Profile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/products/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                                <Route path="/orders/:id" element={<ProtectedRoute><OrderTrack /></ProtectedRoute>} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                                {/* Admin Routes */}
                                <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
                                <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
                                <Route path="/admin/categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
                                <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
                                <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                    <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
