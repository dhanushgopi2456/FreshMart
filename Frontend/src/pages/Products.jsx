import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        API.get('/categories').then(res => setCategories(res.data)).catch(() => { });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (selectedCategory) params.append('category', selectedCategory);
                params.append('sort', sort);
                params.append('page', page);
                params.append('limit', 12);
                const { data } = await API.get(`/products?${params}`);
                setProducts(data.products);
                setTotalPages(data.pages);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [search, selectedCategory, sort, page]);

    useEffect(() => {
        setSearch(searchParams.get('search') || '');
        setSelectedCategory(searchParams.get('category') || '');
    }, [searchParams]);

    return (
        <div className="products-page">
            <div className="products-header page-enter">
                <h1>Our Products</h1>
                <p>Browse fresh groceries from our curated collection</p>
            </div>

            <div className="products-filters page-enter-delay-1">
                <div className="filter-search">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                </div>
                <div className="filter-group">
                    <FiFilter />
                    <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setPage(1); }}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.category}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loader-container"><div className="loader"></div></div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <h2>No products found</h2>
                    <p>Try adjusting your search or filters</p>
                </div>
            ) : (
                <>
                    <div className="products-grid page-enter-delay-2">{products.map((p, idx) => <ProductCard key={p._id} product={p} index={idx} />)}</div>
                    {totalPages > 1 && (
                        <div className="pagination page-enter-delay-3">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-outline">Previous</button>
                            <span>Page {page} of {totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-outline">Next</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;
