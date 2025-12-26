import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeModal, setShowSizeModal] = useState(false); // ⭐ size modal

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

  const handleAddToCart = () => {
    // If Ready-to-Wear and no size selected, open modal
    if (product.subCategory === "Ready to Wear" && !selectedSize) {
      setShowSizeModal(true);
      return;
    }

    onAddToCart({
      ...product,
      size: selectedSize,
    });
  };

  const handleSizeSelectAndAdd = (size) => {
    setSelectedSize(size);
    setShowSizeModal(false);
    onAddToCart({
      ...product,
      size: size,
    });
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

        <div className="eye-icon-overlay" onClick={() => openZoom(0)}>
          <FaSearchPlus size={16} color="#fff" />
        </div>

        {product?.tags && product?.tags?.length > 0 && <span className="product-badge">{product?.tags?.[0]}</span>}

      </div>

      <div className="product-name" title={product.title}>
        {product.title}
      </div>

      {/* Sizes inline (optional) */}
      {/* {product.subCategory === "Ready to Wear" && selectedSize && (
        <div className="selected-size-display">
          Selected size: <strong>{selectedSize}</strong>
        </div>
      )} */}

      <div className="product-meta-row">
        <div className="product-price custom_price_css">{product?.price}</div>

        {product?.stock <= 0 ?
          <button className="btn-add-cart">
            Out of Stock
          </button>

          :
          <button className="btn-add-cart" onClick={handleAddToCart}>
            Add to cart
          </button>}

      </div>

      {/* Zoom modal */}
      {isZoomOpen && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="zoom-close" onClick={closeZoom} />
            {product.images.length > 1 && (
              <FaChevronLeft className="zoom-nav zoom-prev" onClick={prevImage} />
            )}
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

      {/* ⭐ Size Selection Modal */}
      {showSizeModal && (
        <div className="size-modal-overlay" onClick={() => setShowSizeModal(false)}>
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Size</h3>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className="size-option-btn"
                  onClick={() => handleSizeSelectAndAdd(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="size-modal-close" onClick={() => setShowSizeModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
