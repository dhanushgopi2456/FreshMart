import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchCart = async () => {
        if (!user) { setCartItems([]); return; }
        try {
            setLoading(true);
            const { data } = await API.get('/cart');
            setCartItems(data);
        } catch (err) {
            console.error('Fetch cart error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCart(); }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        const { data } = await API.post('/cart', { productId, quantity });
        await fetchCart();
        return data;
    };

    const updateQuantity = async (id, quantity) => {
        await API.put(`/cart/${id}`, { quantity });
        await fetchCart();
    };

    const removeFromCart = async (id) => {
        await API.delete(`/cart/${id}`);
        await fetchCart();
    };

    const clearCart = async () => {
        await API.delete('/cart/clear');
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, loading, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
