import { FaShippingFast, FaUndoAlt, FaLock, FaStar } from 'react-icons/fa';
import './FeaturesSection.css';
const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <FaShippingFast size={30} color="#4caf50" />
          </div>
          <h3>Free Shipping</h3>
          <p>On orders over Rs.500</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaUndoAlt size={30} color="#2196f3" />
          </div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaLock size={30} color="#ff9800" />
          </div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaStar size={30} color="#fbc02d" />
          </div>
          <h3>Quality Products</h3>
          <p>Premium quality guaranteed</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
