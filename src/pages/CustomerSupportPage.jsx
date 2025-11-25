import React from "react";
import "./CustomerSupportPage.css";

const CustomerSupportPage = () => {
  return (
    <div className="cs-wrapper">
      <h1 className="cs-main-title">Customer Support</h1>

      <div className="cs-card">
        <h2>Customer Service</h2>
        <p>
          For any assistance or queries, feel free to reach out to our customer service team.
          We are here to support you with order issues, product information, and more.
        </p>

        <p className="cs-contact"><strong>Contact:</strong> +91 93450 32317</p>

        <ul className="cs-list">
          <li>
            <strong>Free Shipping:</strong> Get your order delivered for free when you spend ₹1000 or more.
          </li>
          <li>
            <strong>Return Policy:</strong> Returns are accepted only for genuine damages and must include an
            unedited parcel-opening video. Return requests are valid within 5 days of delivery.
          </li>
          <li>
            <strong>Secure Payment:</strong> We ensure complete payment security for a safe and worry-free shopping experience.
          </li>
          <li>
            <strong>Quality Products:</strong> All products are crafted with premium materials for lasting quality.
          </li>
        </ul>
      </div>

      <div className="cs-card">
        <h2>Shipping Info</h2>
        <p>
          We offer fast, reliable, and safe shipping. Orders above ₹1000 qualify for free home delivery. 
          Delivery times may vary based on your location.
        </p>
      </div>

      <div className="cs-card">
        <h2>Returns</h2>
        <p>
          Returns are accepted only for genuine damage and must be supported by an unedited 
          parcel-opening video. You can request a return within 5 days of product arrival.
        </p>
      </div>

      <div className="cs-card">
        <h2>Terms & Conditions</h2>
        <p>
          By using our website and making purchases, you agree to follow our rules, policies, 
          and operational guidelines. Please review the full terms for more details.
        </p>
      </div>

      <div className="cs-card">
        <h2>Privacy Policy</h2>
        <p>
          Your privacy is important to us. We securely store your personal information and use it 
          only to enhance your shopping experience. We do not share your data without permission.
        </p>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
