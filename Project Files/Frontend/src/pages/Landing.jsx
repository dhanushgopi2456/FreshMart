import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';
import useScrollReveal from '../hooks/useScrollReveal';
import { FiTruck, FiClock, FiShield, FiPercent, FiArrowRight, FiStar, FiHeart, FiAward } from 'react-icons/fi';

const Landing = () => {
    const [featured, setFeatured] = useState([]);
    const [newest, setNewest] = useState([]);
    const [categories, setCategories] = useState([]);

    // Scroll reveal refs for each section
    const promoRef = useScrollReveal();
    const featuresRef = useScrollReveal();
    const categoriesRef = useScrollReveal();
    const featuredRef = useScrollReveal();
    const whyRef = useScrollReveal();
    const newestRef = useScrollReveal();
    const ctaRef = useScrollReveal();

    useEffect(() => {
        API.get('/products?limit=8&sort=rating').then(res => setFeatured(res.data.products)).catch(() => { });
        API.get('/products?limit=4&sort=newest').then(res => setNewest(res.data.products)).catch(() => { });
        API.get('/categories').then(res => setCategories(res.data)).catch(() => { });
    }, []);

    const categoryEmojis = {
        'Fruits & Vegetables': '🥑',
        'Dairy & Eggs': '🥛',
        'Bakery': '🥐',
        'Beverages': '🧃',
        'Snacks': '🍫',
        'Grains & Cereals': '🌾',
        'Meat & Seafood': '🥩',
        'Frozen Foods': '🧊',
    };

    return (
        <div className="landing">

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-content hero-animate-left">
                    <span className="hero-badge">🌿 Fresh & Organic</span>
                    <h1>Fresh Groceries<br /><span className="gradient-text">Delivered to Your Door</span></h1>
                    <p>Shop from our wide selection of fresh produce, dairy, bakery items, and more. Quality ingredients for your healthy lifestyle.</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn btn-primary btn-lg">Shop Now <FiArrowRight /></Link>
                        <Link to="/products" className="btn btn-outline btn-lg">Browse Categories</Link>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat"><strong>42+</strong><span>Products</span></div>
                        <div className="hero-stat"><strong>8</strong><span>Categories</span></div>
                        <div className="hero-stat"><strong>24/7</strong><span>Delivery</span></div>
                    </div>
                </div>
                <div className="hero-image hero-animate-right">
                    <div className="hero-blob"></div>
                    <div className="hero-blob hero-blob-2"></div>
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=450&fit=crop" alt="Fresh Groceries" />
                    <div className="hero-float-card float-card-1">
                        <span>🥑</span>
                        <div><strong>Fresh Daily</strong><small>Local farms</small></div>
                    </div>
                    <div className="hero-float-card float-card-2">
                        <span>⭐</span>
                        <div><strong>4.8 Rating</strong><small>2k+ reviews</small></div>
                    </div>
                </div>
            </section>

            {/* ===== PROMO BANNER ===== */}
            <section className="promo-banner reveal reveal-up" ref={promoRef}>
                <div className="promo-card promo-green card-animate" style={{ '--i': 0 }}>
                    <div className="promo-content">
                        <span className="promo-tag">Weekend Special</span>
                        <h3>Fresh Fruits & Veggies</h3>
                        <p>Up to 30% off on all organic produce</p>
                        <Link to="/products?category=" className="btn btn-primary">Shop Now</Link>
                    </div>
                    <div className="promo-emoji">🥬</div>
                </div>
                <div className="promo-card promo-orange card-animate" style={{ '--i': 1 }}>
                    <div className="promo-content">
                        <span className="promo-tag">New Arrivals</span>
                        <h3>Bakery Fresh Daily</h3>
                        <p>Artisan breads & pastries</p>
                        <Link to="/products" className="btn btn-primary">Explore</Link>
                    </div>
                    <div className="promo-emoji">🥐</div>
                </div>
                <div className="promo-card promo-purple card-animate" style={{ '--i': 2 }}>
                    <div className="promo-content">
                        <span className="promo-tag">Best Sellers</span>
                        <h3>Dairy & Eggs</h3>
                        <p>Farm-fresh goodness</p>
                        <Link to="/products" className="btn btn-primary">View All</Link>
                    </div>
                    <div className="promo-emoji">🥛</div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="features reveal reveal-up" ref={featuresRef}>
                <div className="feature-card card-animate" style={{ '--i': 0 }}>
                    <div className="feature-icon-wrap"><FiTruck className="feature-icon" /></div>
                    <h3>Free Delivery</h3>
                    <p>On orders over ₹500</p>
                </div>
                <div className="feature-card card-animate" style={{ '--i': 1 }}>
                    <div className="feature-icon-wrap"><FiClock className="feature-icon" /></div>
                    <h3>Fast Shipping</h3>
                    <p>Same day delivery</p>
                </div>
                <div className="feature-card card-animate" style={{ '--i': 2 }}>
                    <div className="feature-icon-wrap"><FiShield className="feature-icon" /></div>
                    <h3>Quality Guarantee</h3>
                    <p>Fresh or full refund</p>
                </div>
                <div className="feature-card card-animate" style={{ '--i': 3 }}>
                    <div className="feature-icon-wrap"><FiPercent className="feature-icon" /></div>
                    <h3>Best Prices</h3>
                    <p>Price match promise</p>
                </div>
            </section>

            {/* ===== CATEGORIES ===== */}
            {categories.length > 0 && (
                <section className="section reveal reveal-up" ref={categoriesRef}>
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Shop by Category</h2>
                            <p className="section-subtitle">Browse our wide selection of fresh groceries</p>
                        </div>
                    </div>
                    <div className="categories-grid">
                        {categories.map((cat, idx) => (
                            <Link key={cat._id} to={`/products?category=${cat._id}`} className="category-card card-animate" style={{ '--i': idx }}>
                                <div className="category-icon">{categoryEmojis[cat.category] || '🛒'}</div>
                                <h3>{cat.category}</h3>
                                <p>{cat.description}</p>
                                <span className="category-arrow"><FiArrowRight /></span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== FEATURED / TOP RATED ===== */}
            {featured.length > 0 && (
                <section className="section reveal reveal-up" ref={featuredRef}>
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">⭐ Top Rated Products</h2>
                            <p className="section-subtitle">Loved by our customers</p>
                        </div>
                        <Link to="/products?sort=rating" className="btn btn-outline">View All <FiArrowRight /></Link>
                    </div>
                    <div className="products-grid">
                        {featured.map((p, idx) => <ProductCard key={p._id} product={p} index={idx} />)}
                    </div>
                </section>
            )}

            {/* ===== WHY CHOOSE US ===== */}
            <section className="why-choose-section reveal reveal-up" ref={whyRef}>
                <div className="why-choose-header">
                    <h2 className="section-title">Why Choose FreshMart?</h2>
                    <p className="section-subtitle">We're committed to bringing you the best grocery experience</p>
                </div>
                <div className="why-choose-grid">
                    <div className="why-card card-animate" style={{ '--i': 0 }}>
                        <div className="why-icon"><FiHeart /></div>
                        <h3>Hand-Picked Quality</h3>
                        <p>Every product is carefully selected to meet our high quality standards</p>
                    </div>
                    <div className="why-card card-animate" style={{ '--i': 1 }}>
                        <div className="why-icon"><FiAward /></div>
                        <h3>Trusted by 10,000+</h3>
                        <p>Join thousands of happy families who shop with us every week</p>
                    </div>
                    <div className="why-card card-animate" style={{ '--i': 2 }}>
                        <div className="why-icon"><FiStar /></div>
                        <h3>4.8★ Average Rating</h3>
                        <p>Our customers love the freshness and variety of our products</p>
                    </div>
                    <div className="why-card card-animate" style={{ '--i': 3 }}>
                        <div className="why-icon"><FiTruck /></div>
                        <h3>Eco-Friendly Delivery</h3>
                        <p>Sustainable packaging and carbon-neutral delivery options</p>
                    </div>
                </div>
            </section>

            {/* ===== NEWEST PRODUCTS ===== */}
            {newest.length > 0 && (
                <section className="section reveal reveal-up" ref={newestRef}>
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">🆕 Just Arrived</h2>
                            <p className="section-subtitle">Fresh additions to our catalog</p>
                        </div>
                        <Link to="/products?sort=newest" className="btn btn-outline">View All <FiArrowRight /></Link>
                    </div>
                    <div className="products-grid">
                        {newest.map((p, idx) => <ProductCard key={p._id} product={p} index={idx} />)}
                    </div>
                </section>
            )}

            {/* ===== CTA ===== */}
            <section className="cta-section reveal reveal-scale" ref={ctaRef}>
                <div className="cta-content">
                    <span className="cta-badge">🎉 Limited Time Offer</span>
                    <h2>Get 15% Off Your First Order</h2>
                    <p>Sign up today and enjoy fresh groceries at amazing prices. Free delivery on your first order!</p>
                    <div className="hero-buttons" style={{ justifyContent: 'center' }}>
                        <Link to="/register" className="btn btn-primary btn-lg">Create Account <FiArrowRight /></Link>
                        <Link to="/products" className="btn btn-outline btn-lg">Explore Products</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
