import React from "react";
import "./HeroCard.css";

function HeroCard({ label, gradient }) {
  return (
    <div className="hero-card" style={{ background: gradient }}>
      <span className="hero-card-label">{label}</span>
    </div>
  );
}

export default HeroCard;
