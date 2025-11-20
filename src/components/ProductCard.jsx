import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openZoom = (index = 0) => {
    setCurrentIndex(index);
    setIsZoomOpen(true);
  };

  const closeZoom = () => setIsZoomOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrap">
        <Link to={`/product/${product.productId}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        </Link>

        {/* Eye icon */}
        <div className="eye-icon-overlay" onClick={() => openZoom(0)}>
          <FaEye size={16} color="#fff" />
        </div>

        {product.unique && <span className="product-badge">Unique</span>}
        {product.premium && <span className="product-badge">Premium</span>}
        {product.budget && <span className="product-badge">Budget</span>}
      </div>

      <div className="product-name" title={product.title}>
        {product.title}
      </div>

      <div className="product-meta-row">
        <div className="product-price">
          ₹ {product?.price}
        </div>
        <button
          className="btn-add-cart"
          onClick={() => onAddToCart(product.productId)}
        >
          Add to cart
        </button>
      </div>

      {/* Zoom modal */}
      {isZoomOpen && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="zoom-close" onClick={closeZoom} />

            {/* Previous button */}
            {product.images.length > 1 && (
              <FaChevronLeft className="zoom-nav zoom-prev" onClick={prevImage} />
            )}

            {/* Next button */}
            {product.images.length > 1 && (
              <FaChevronRight className="zoom-nav zoom-next" onClick={nextImage} />
            )}

            <img
              src={product.images[currentIndex]}
              alt={`${product.name} - ${currentIndex + 1}`}
              className="zoom-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
