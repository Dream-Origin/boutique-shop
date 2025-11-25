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
            Tharagai Boutique in Hosur offers premium quality sarees, salwar materials, and handcrafted fabrics sourced from across India. Known for exquisite designs and superior craftsmanship, it provides an exclusive collection that blends tradition with modern style. Visit us at Amman Nagar, Dinnur, Hosur for authentic, handpicked attire and personalized service.


          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li>Contact - +919345032317 </li>
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
          <h3>Newsletter</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Subscribe to get special offers and updates
          </p>
          <input
            type="email"
            className="search-input"
            placeholder="Your email"
            style={{ marginBottom: '12px', width: '100%' }}
          />
          <button className="btn btn-primary" style={{ width: '100%' }}>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Tharagai Boutique. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
