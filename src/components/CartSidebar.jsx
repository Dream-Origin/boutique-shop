import React from 'react'

function CartSidebar({ isOpen, cart, onClose, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn" 
                      onClick={() => onUpdateQuantity(item.id, -1)}
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
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
            Checkout
          </button>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onClearCart}>
            Clear Cart
          </button>
        </div>
      </aside>
    </>
  )
}

export default CartSidebar
