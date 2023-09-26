import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="cart-items">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <span>{item.title}</span>
              <span className="price">€{item.price}</span>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button>Back to Products</button>
      </Link>
    </div>
  );
}

export default Cart;
