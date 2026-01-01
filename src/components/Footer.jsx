import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Tharagai Boutique</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Tharagai Boutique is your one-stop destination for premium unstitched dress materials and elegant ready-to-wear suits. We offer exclusive collections crafted from high-quality fabrics, designed to bring out timeless style and comfort. Our ready-to-wear range features premium Jaipur cotton, known for its softness, breathability, and classic appeal. Discover the latest trends and handpicked designs on our website. Happy shopping!
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/my-orders">My Orders</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/customer-support">Shipping Info</Link></li>
            <li><Link to="/customer-support">Returns</Link></li>
            <li><Link to="/customer-support">Terms & Conditions</Link></li>
            <li><Link to="/customer-support">Privacy Policy</Link></li>

          </ul>
        </div>
        <div className="footer-section">
          <h3>Address</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Reddys biriyani backside, Plot no 1A, Amman Nagar, Navadhi, Dinnur, Hosur, Tamil Nadu 635109
            
            <br/>Contact - +919345032317 
          </p>

        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Tharagai Boutique. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
