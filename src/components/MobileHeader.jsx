import React, { useState } from "react";
import "./MobileHeader.css";
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter'
import boutiqueLogo from '../data/images/logo.png';
import { useNavigate } from "react-router-dom";


// You can pass these from props if desired for navigation
const menuLinks = [
  { label: "New Arrival", type: "newArrival" },
  { label: "Salwar materials", type: "salwarMaterial" },
  { label: "Ready to wear", type: "readyToWear" },
  { label: "Bestseller", type: "bestSeller" },
  { label: "Rare & Unique", type: "unique" },
];
const tabBarLinks = [
  { label: "SALWAR MATERIALS", icon: "👗", type: "salwarMaterial" },
  { label: "READY TO WEAR", icon: "🥻", type: "readyToWear" },
];

function MobileHeader({ cart = [], wishlistCount = [] }) {
  const applyFilter = useApplyHomeFilter()
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  // Trap focus in sidebar when open for accessibility
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Allow ESC to close sidebar
  React.useEffect(() => {
    const handleKeyDown = e => {
      if (menuOpen && e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const navigateToHome = () => {
    navigate('/')
  }
   const navigateToCart = () => {
        navigate('/cart')
    }

  return (
    <>
      <div className="mobile-header-bar">
        <button
          className="header-icon"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? (
            <span className="icon-close">&#10005;</span>
          ) : (
            <span className="icon-hamburger">&#9776;</span>
          )}
        </button>
        <button className="header-icon" aria-label="Search">
          <span role="img" aria-label="Search">🔍</span>
        </button>
        <div className="mobile-logo">

          <img src={boutiqueLogo} height="50" onClick={navigateToHome} />


        </div>
        <button className="header-icon" aria-label="Wishlist">
          <span role="img" aria-label="Wishlist">♡</span>
          {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
        </button>
        <button className="header-icon" aria-label="Cart" onClick={navigateToCart}>
          <span role="img" aria-label="Cart">👜</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </div>

      <div
        className={`mobile-sidebar-bg${menuOpen ? ' active' : ''}`}
        tabIndex={-1}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`mobile-sidebar${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
      >
        <nav className="mobile-menu-list" aria-label="Main menu">
          {menuLinks.map(link => (
            <span key={link.label} onClick={() => { applyFilter(link.type); setMenuOpen(false); }}>{link.label}</span>
          ))}
        </nav>
        <div className="mobile-tab-bar">
          {tabBarLinks.map(tab => (

            <div
              key={tab.label}
              onClick={() => { applyFilter(tab.type); setMenuOpen(false); }}
              className={`tab-link${tab.active ? " active" : ""}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default MobileHeader;
