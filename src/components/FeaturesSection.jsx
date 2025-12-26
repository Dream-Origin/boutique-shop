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
          <p>Get your order delivered for free when you spend Rs.1000 or more.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaUndoAlt size={30} color="#2196f3" />
          </div>
          <h3>Return Policy</h3>
          <p>Returns are accepted only in cases of genuine damage and must be supported by an unedited parcel-opening video. Customers may request a return within 5 days of receiving the product.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaLock size={30} color="#ff9800" />
          </div>
          <h3>Secure Payment</h3>
          <p>We ensure complete payment security for a safe and worry-free shopping experience.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaStar size={30} color="#fbc02d" />
          </div>
          <h3>Quality Products</h3>
          <p>Our products are crafted with premium materials to ensure lasting quality.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
