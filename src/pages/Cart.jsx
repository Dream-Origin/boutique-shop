import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { useImages } from '../hooks/useImages';

import './Cart.css'
function Cart({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const imagesKey = useImages();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const totalOriginalPrice = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const youSave = totalOriginalPrice - subtotal;


  const shipping = subtotal - youSave > 500 ? 0 : 10;
  const total = subtotal;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart' }
  ];

  if (cart.length === 0) {
    return (
      <div className="shop-container">
        <div className='shop-breadcrumb-div'>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="page-title">Shopping Cart</h1>
        </div>
        <div className="empty-state">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className='shop-breadcrumb-div'>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="page-title">Shopping Cart</h1>
      </div>

      <div className="cart-page">
        <div className="cart-items-section">
          {cart.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.images?.[0]} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">
                  {item.discountedPrice ? (
                    <>
                      <span className="original-price">₹{item.price.toFixed(2)}</span>
                      <span className="discounted-price"> ₹{item.discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    `₹${item.price.toFixed(2)}`
                  )}
                </p>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.productId, -1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.productId, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                ₹{((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
              </div>
              <button
                className="cart-item-remove"
                onClick={() => onRemoveFromCart(item.productId)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/products" className="btn continue-shopping-btn">Continue Shopping  → </Link>
            <button className="btn clear-cart-btn" onClick={onClearCart}>Clear Cart</button>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {youSave > 0 && (
            <>
              <div className="summary-row">

                <span>You Save:</span>
                <span style={{ color: 'green', fontWeight: '600' }}>
                  ₹{youSave.toFixed(2)}
                </span>
              </div>
              
            </>
          )}
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{subtotal - youSave > 50 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
          </div>
          {subtotal - youSave < 50 && (
            <p className="shipping-notice">
              Add ₹{(50 - (subtotal - youSave)).toFixed(2)} more for free shipping!
            </p>
          )}
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary btn-full-width"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}


export default Cart
