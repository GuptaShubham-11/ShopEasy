import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../css/productDetail.css';
import { ArrowLeft, CheckCircle2, Star, StarOff } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    if (!product) {
        return <p className="loading-text">Loading product details...</p>;
    }

    return (
        <div className="product-detail-container">
            <button className="back-button" onClick={() => window.history.back()}>
                <ArrowLeft size={20} />
            </button>

            {showSuccess && (
                <div className="success-toast">
                    <CheckCircle2 size={18} /> Added to cart!
                </div>
            )}

            <div className="product-detail-wrapper">
                <img src={product.image} alt={product.title} className="product-detail-img" />

                <div className="product-detail-info">
                    <h2>{product.title}</h2>
                    <p className="product-detail-category">Category: {product.category}</p>

                    {/* Rating */}
                    <div className="product-rating">
                        {Array.from({ length: 5 }, (_, index) => {
                            const filled = index < Math.round(product.rating.rate);
                            return filled ? (
                                <Star key={index} size={18} className="star filled" />
                            ) : (
                                <StarOff key={index} size={18} className="star" />
                            );
                        })}
                        <span className="rating-value">
                            {product.rating.rate} / 5 ({product.rating.count})
                        </span>
                    </div>

                    <p className="product-detail-description">{product.description}</p>
                    <h3 className="product-price">${product.price}</h3>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
