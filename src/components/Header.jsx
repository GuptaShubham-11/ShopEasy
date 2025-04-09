import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Home, ShoppingCart, LogOut } from 'lucide-react';
import '../css/header.css';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const { getCartItemCount } = useContext(CartContext);
    const cartCount = getCartItemCount();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, [navigate]);

    return (
        <header className="header">
            <Link to="/" className="logo">🛍️ ShopEasy</Link>

            {token && (
                <nav className="nav" role="navigation" aria-label="Main Navigation">
                    <Link to="/home" className="nav-link" aria-label="Home">
                        <Home size={20} />
                        <span className="link-text">Home</span>
                    </Link>

                    <Link to="/cart" className="nav-link cart-link" aria-label="Cart">
                        <ShoppingCart size={20} />
                        <span className="link-text">Cart</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    <button onClick={handleLogout} className="nav-link logout-btn" aria-label="Logout">
                        <LogOut size={20} />
                        <span className="link-text">Logout</span>
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
