import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ScrollableCategoryCarousel.css';
import { useImages } from '../hooks/useImages';
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter';
import { useNavigate } from 'react-router-dom';

const ScrollableCategoryCarousel = ({ header, images, type }) => {
  const imagesKey = useImages();
  const applyFilter = useApplyHomeFilter()

  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

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
        {images.map(({ id, images, title, price, productId }) => (

          <div key={id} className="carousel-item">

            <img src={images[0]} alt={title} className="carousel-image" onClick={() => navigateToProductDetails(productId)} />
            <h3 className="carousel-title" title={title}>{title}</h3>
            <div className="price-addcart-container">
              <p className="carousel-price">₹{price.toFixed(2)}</p>
              <button
                className="carousel-add-to-cart-btn"
                onClick={() => handleAddToCart(id)}
                aria-label={`Add ${title} to Cart`}
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
