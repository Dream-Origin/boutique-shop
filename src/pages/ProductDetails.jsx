import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { productsData } from '../data/products'
import './ProductDetails.css'
import { selectProductsById, selectProductsBySubCategoryName } from '../redux/selectors/productsSelectors'
import { useSelector } from 'react-redux'
import { useImages } from '../hooks/useImages';
import ScrollableCategoryCarousel from '../components/ScrollableCategoryCarousel'

function ProductDetails({ onAddToCart, onToggleWishlist, isInWishlist }) {
  const imagesKey = useImages();
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const product = useSelector(selectProductsById(id));
  const relatedProducts = useSelector(selectProductsBySubCategoryName(product.subCategory)).filter(p => p.id !== product.id);
  console.log('Related Products:', relatedProducts, product);
  if (!product) {
    return (
      <div className="shop-container">
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: product.name }
  ]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product.id)
    }
  }


  return (
    <div className="shop-container">
      <Breadcrumb items={breadcrumbItems} />

      <div className="product-details">
        <div className="product-details-image">
          {product && <img src={imagesKey[`${product?.images?.[0]}.jpg`]} alt={product.title} />}
          <span className="product-badge">{product.badge}</span>
        </div>

        <div className="product-details-info">
          <div className="product-category">{product.subCategory}</div>
          <h1 className="product-details-name">{product.title}</h1>

          <div className="product-rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price">
            <span className="current-price">{product.price}</span>
            <span className="discount-badge">
              {product.discountPercentage}% OFF
            </span>
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-actions-group">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className={`btn btn-secondary ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
              >
                {isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <strong>SKU:</strong> FL-{product.id}
            </div>
            <div className="meta-item">
              <strong>Category:</strong> {product.category}
            </div>
            <div className="meta-item">
              <strong>Availability:</strong> <span className="in-stock">In Stock</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
         
          {/* <div className="products-grid"> */}
             <section>
                <ScrollableCategoryCarousel
                  header="Related Products"
                  images={relatedProducts}
                  headerStyle={{ color: '#333' }}
                />
              </section>
            {/* {relatedProducts.map(product => (
             
              <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isInWishlist={isInWishlist}
                />
              <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="product-image">
                  <img src={imagesKey[`${p.images?.[0]}.jpg`]} alt={p.name} />
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">
                    <span className="current-price">${p.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))} */}
          {/* </div> */}
        </div>
      )}
    </div>
  )
}

export default ProductDetails
