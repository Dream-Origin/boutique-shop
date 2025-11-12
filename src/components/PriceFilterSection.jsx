import React from "react";
import "./PriceFilterSection.css";

const PRICE_FILTERS = [
  {
    value: "below-1000",
    label: "BELOW ₹1000",
    subtitle: "Under Rs.1000",
    from: 0,
    to: 999
  },
  {
    value: "1000-2000",
    label: "₹1000-₹2000",
    subtitle: "Rs. 1000 - Rs. 2000",
    from: 1000,
    to: 2000
  },
  {
    value: "above-2000",
    label: "ABOVE ₹2000",
    subtitle: "Rs. 2000 & Above",
    from: 2001,
    to: null
  }
];

export default function PriceFilterSection({ selected, onChange }) {
  return (
    <section className="price-filter-section">
      <h2 className="price-filter-title">Shop salwars by price</h2>
      <div className="price-filter-cards">
        {PRICE_FILTERS.map(opt => (
          <button
            key={opt.value}
            className={`price-card ${selected === opt.value ? "active" : ""}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={selected === opt.value}
          >
            <span className="price-card-label">{opt.label}</span>
            <span className="price-card-sub">{opt.subtitle}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
