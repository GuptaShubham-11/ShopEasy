import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../css/cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    const handleCheckout = () => {
        clearCart();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 4000);
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Cart 🛒</h2>

            {cartItems.length === 0 ? (
                <p className="empty">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-list">
                        {cartItems.map(({ id, image, title, price, quantity }) => (
                            <div className="cart-item" key={id}>
                                <img src={image} alt={title} />
                                <div className="item-info">
                                    <h3>{title}</h3>
                                    <p>${price.toFixed(2)}</p>
                                    <div className="controls">
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) =>
                                                updateQuantity(id, parseInt(e.target.value))
                                            }
                                        />
                                        <button onClick={() => removeFromCart(id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <p>Total: <strong>${totalPrice.toFixed(2)}</strong></p>
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </div>
                </>
            )}

            {showPopup && <div className="popup">✅ Order placed successfully!</div>}
        </div>
    );
};

export default Cart;
