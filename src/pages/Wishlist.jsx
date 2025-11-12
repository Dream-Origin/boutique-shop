import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Breadcrumb from '../components/Breadcrumb'
import './Wishlist.css'

function Wishlist({ wishlist, onAddToCart, onRemoveFromWishlist }) {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Wishlist' }
  ]

  return (
    <div className="shop-container">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="wishlist-header">
        <div>
          <h1 className="page-title">My Wishlist</h1>
          <p className="wishlist-count">{wishlist.length} items</p>
        </div>
        
        {wishlist.length > 0 && (
          <div className="wishlist-actions">
            <Link to="/shop" className="btn btn-secondary">
              Continue Shopping
            </Link>
            <button 
              className="btn btn-primary"
              onClick={() => {
                wishlist.forEach(item => onAddToCart(item.id))
              }}
            >
              Add All to Cart
            </button>
          </div>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="products-grid">
          {wishlist.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onRemoveFromWishlist}
              isInWishlist={() => true}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items to your wishlist and check them out anytime!</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist
