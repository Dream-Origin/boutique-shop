import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import IMG_6351 from '../data/images/IMG_6351.jpg';
import { useImages } from '../hooks/useImages';


function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }) {
    const imagesKey = useImages();

  return (
    <div className="product-card">
      <Link to={`/product/${product.productId}`} className="product-card-img-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        
        {product.unique && <span className="product-badge">Unique</span>}
        {product.premium && <span className="product-badge">Premium</span>}
        {product.budget && <span className="product-badge">Budget</span>}
        <button
          className={`wishlist-btn${isInWishlist(product.id) ? ' active' : ''}`}
          onClick={e => {
            e.preventDefault()
            onToggleWishlist(product.id)
          }}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          tabIndex={0}
        >
          {isInWishlist(product.id) ? '♥' : '♡'}
        </button>
      </Link>
      <div className="product-name" title={product.title}>
        {product.title}
      </div>
      <div className="product-meta-row">
        <div className="product-price">
          ₹ {product.price.toLocaleString('en-IN')}
        </div>
        <button
          className="btn-add-cart"
          onClick={() => onAddToCart(product.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
