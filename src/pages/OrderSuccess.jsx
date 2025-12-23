import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './OrderSuccess.css'

function OrderSuccess() {
  const location = useLocation()
  const { paymentId, orderId } = location.state || {}

  return (
    <div className="shop-container">
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        
        {paymentId && (
          <div className="order-details">
            <p><strong>Payment ID:</strong> {paymentId}</p>
            {orderId && <p><strong>Order ID:</strong> {orderId}</p>}
          </div>
        )}

        <div className="success-actions">
          <Link to="/products?newArrival=true" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
