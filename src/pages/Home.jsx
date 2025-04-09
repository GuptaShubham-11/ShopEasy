import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../css/home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        const url =
            selectedCategory === 'all'
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/category/${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
    };

    const fetchCategories = async () => {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <main className="home-container">
            <h2 className="home-title">🛍️ Shop Products</h2>

            <section className="top-bar">
                <div className="category-filter">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={selectedCategory === 'all' ? 'active' : ''}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? 'active' : ''}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="search-bar">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search products"
                    />
                </div>
            </section>

            {loading ? (
                <p className="loading">Loading products...</p>
            ) : (
                <section className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                <img src={product.image} alt={product.title} />
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                            </Link>
                        ))
                    ) : (
                        <p className="no-products">No products found.</p>
                    )}
                </section>
            )}
        </main>
    );
};

export default Home;
