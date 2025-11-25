import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ScrollableCategoryCarousel.css';
import { useImages } from '../hooks/useImages';
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter';
import { useNavigate } from 'react-router-dom';

const ScrollableCategoryCarousel = ({ header, images, type, onAddToCart }) => {
  const imagesKey = useImages();
  const applyFilter = useApplyHomeFilter()

  const dispatch = useDispatch();


  const navigate = useNavigate()

  const navigateToProductDetails = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className="carousel-container">
      <div className="carousel-header-container">
        <h2 className="carousel-header" title={header}>{header}</h2>
        <a
          href="#"
          className="carousel-view-all"
          onClick={(e) => {
            e.preventDefault();
            applyFilter(type)
          }}
        >
          View All
        </a>
      </div>
      <div className="carousel-scroll">
        {images.map((product) => (

          <div key={product?.productId} className="carousel-item">

            <img src={product?.images[0]} alt={product?.title} className="carousel-image" onClick={() => navigateToProductDetails(product?.productId)} />
            <h3 className="carousel-title" title={product?.title}>{product?.title}</h3>
            <div className="price-addcart-container">
              <p className="carousel-price">₹{product?.price}</p>
              <button
                className="carousel-add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCategoryCarousel;
