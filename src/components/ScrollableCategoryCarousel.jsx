import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ScrollableCategoryCarousel.css';
import { useImages } from '../hooks/useImages';
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter';
import { useNavigate } from 'react-router-dom';

const ScrollableCategoryCarousel = ({ header, images, type, onAddToCart }) => {
  const imagesKey = useImages();
  const applyFilter = useApplyHomeFilter();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null); // product for which modal is open
  const [selectedSize, setSelectedSize] = useState(null); // size selected in modal

  const navigateToProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCartClick = (product) => {
    // If Ready to Wear and no size selected → open modal
    if (product.subCategory === "Ready to Wear") {
      setSelectedProduct(product);
      setSelectedSize(null);
      return;
    }

    onAddToCart(product); // direct add for non-Ready-to-Wear
  };

  const handleSizeSelectAndAdd = (size) => {
    if (!selectedProduct) return;

    onAddToCart({
      ...selectedProduct,
      size,
    });

    setSelectedProduct(null);
    setSelectedSize(null);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header-container">
        <h2 className="carousel-header" title={header}>{header}</h2>
        <a
          href="#"
          className="carousel-view-all"
          onClick={(e) => {
            e.preventDefault();
            applyFilter(type);
          }}
        >
          View All
        </a>
      </div>

      <div className="carousel-scroll">
        {images.map((product) => (
          <div key={product?.productId} className="carousel-item">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="carousel-image"
              onClick={() => navigateToProductDetails(product?.productId)}
            />
            <h3 className="carousel-title" title={product?.title}>{product?.title}</h3>
            <div className="price-addcart-container">
              <p className="carousel-price">₹{product?.price}</p>
              <button
                className="carousel-add-to-cart-btn"
                onClick={() => handleAddToCartClick(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ⭐ Size Selection Modal */}
      {selectedProduct && selectedProduct.subCategory === "Ready to Wear" && (
        <div className="size-modal-overlay" onClick={closeModal}>
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Size for {selectedProduct.title}</h3>
            <div className="size-options">
              {selectedProduct.sizes.map((size, index) => (
                <button
                  key={index}
                  className="size-option-btn"
                  onClick={() => handleSizeSelectAndAdd(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="size-modal-close" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollableCategoryCarousel;
