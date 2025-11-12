import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ cartCount, wishlistCount, user, onLogout }) {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false)
  }

  const handleLogout = () => {
    onLogout()
    closeProfileDropdown()
    closeMobileMenu()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeProfileDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`header ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-top">
          Free shipping on orders over $50 | Shop Now!
        </div>
        <div className="header-main">
          <Link to="/" className="logo" onClick={closeMobileMenu}>FLONE</Link>
          
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="nav nav-desktop">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
          </nav>

          <div className="header-icons">
            <button className="icon-btn" aria-label="Search">🔍</button>
            <button 
              className="icon-btn" 
              onClick={() => { navigate('/wishlist'); closeMobileMenu(); }} 
              aria-label="Wishlist"
            >
              ❤️
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            <button 
              className="icon-btn" 
              onClick={() => { navigate('/cart'); closeMobileMenu(); }} 
              aria-label="Cart"
            >
              🛒
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

            {/* Profile Icon with Dropdown */}
            {user ? (
              <div className="profile-dropdown" ref={dropdownRef}>
                <button 
                  className="icon-btn profile-btn" 
                  onClick={toggleProfileDropdown}
                  aria-label="Profile"
                >
                  👤
                </button>
                {isProfileDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-user-icon">👤</div>
                      <div className="dropdown-user-info">
                        <div className="dropdown-user-name">Hi, {user.name}</div>
                        <div className="dropdown-user-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/orders" className="dropdown-item" onClick={closeProfileDropdown}>
                      📦 My Orders
                    </Link>
                    <Link to="/wishlist" className="dropdown-item" onClick={closeProfileDropdown}>
                      ❤️ Wishlist
                    </Link>
                    <Link to="/profile" className="dropdown-item" onClick={closeProfileDropdown}>
                      ⚙️ Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className={`nav nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
        <Link to="/cart" onClick={closeMobileMenu}>Cart</Link>
        <Link to="/wishlist" onClick={closeMobileMenu}>Wishlist</Link>
        
        {user ? (
          <>
            <div className="mobile-user-info">
              <div className="mobile-user-icon">👤</div>
              <div>
                <div className="mobile-user-name">Hi, {user.name}</div>
                <div className="mobile-user-email">{user.email}</div>
              </div>
            </div>
            <Link to="/orders" onClick={closeMobileMenu}>📦 My Orders</Link>
            <Link to="/profile" onClick={closeMobileMenu}>⚙️ Settings</Link>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={closeMobileMenu}>🔑 Login</Link>
        )}
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay active"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  )
}

export default Header
