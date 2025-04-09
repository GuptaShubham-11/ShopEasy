import { useNavigate } from 'react-router-dom';
import '../css/landing.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <img src="/shoping.svg" alt="SHPOING SVG" className='landing-img' />
            <h1 className="landing-title">Welcome to 🛍️ ShopEasy</h1>
            <p className="landing-subtitle">Your one-stop destination for all things shopping!</p>
            <div className="landing-buttons">
                <button onClick={() => navigate('/login')} className="btn start-btn">
                    Start Shopping
                </button>
            </div>
        </div>
    );
};

export default Landing;
