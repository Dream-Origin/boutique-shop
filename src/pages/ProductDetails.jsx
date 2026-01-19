import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import { productsData } from '../data/products'
import './ProductDetails.css'
import { selectProductsById, selectProductsBySubCategoryName } from '../redux/selectors/productsSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { useImages } from '../hooks/useImages';
import ScrollableCategoryCarousel from '../components/ScrollableCategoryCarousel'
import { fetchProducts } from '../redux/slices/productsSlice'
import ProductImageZoom from '../components/ProductImageZoom'
function ProductDetails({ onAddToCart, onToggleWishlist, isInWishlist }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => state.products);
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  const imagesKey = useImages();
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const product = useSelector(selectProductsById(id));
  const relatedProducts = useSelector(selectProductsBySubCategoryName(product?.subCategory)).filter(p => p.productId !== product.productId);
  if (!product) {
    return (
      <div className="no-product-container">
        <div className="no-product-card">
          <h2>Oops! Product not found</h2>
          <p>We couldn’t find the product you’re looking for. Try exploring other items in our shop.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Back to Product
          </button>
        </div>
      </div>

    )
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Product', path: `/product/${product.productId}` },
    { label: product.productId }
  ]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        ...product,
        size: selectedSize,
      });
    }
  }


  return (
    <div className="shop-container">
      <div className='shop-breadcrumb-div'>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="page-title">{product?.title}</h1>
      </div>

      <div className="product-details">
        {/* <div className="product-details-image">
          {product && <img src={product?.images?.[0]} alt={product.title} />}
          <span className="product-badge">{product.tags?.[0]}</span>
        </div> */}
        <ProductImageZoom
          src={product?.images?.[0]}
          alt={product?.title}
          badge={product?.tags?.[0]}
        />


        <div className="product-details-info">
          <div className="product-category">{product.subCategory}</div>
          <h1 className="product-details-name">
            {product.title}{" "}
            {product.tags.includes("Hot Sale") && (
              <sup className="product-details-tag-style">{product.tags?.[0]}</sup>
            )}
          </h1>



          <div className="product-price">
            <span className="product-details-current-price custom_price_css">{product.price}</span>
            <span className="product-details-original-price">₹ {product.originalPrice}</span>
            <span className="product-details-discount-badge">{product.discountPercentage}% OFF</span>
          </div>

          {/* Savings info, if available */}
          {product.originalPrice > 0 && product.price > 0 && product.discountPercentage > 0 && (
            <div className="savings-info">
              {`Saved ₹ ${(product.originalPrice - product.price).toLocaleString('en-IN')} (${product.discountPercentage}%) on this item when compared to the market price`}
            </div>
          )}
          {/* Shipping or other notes */}
          <div className="shipping-info">
            <strong>Free Shipping</strong> on all orders
          </div>

          <div className="product-details-product-variants">
            <div className="product-details-product-colors">
              <strong>Color:</strong>
              <span>{product.colors?.[0]}</span>
              {/* {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="product-details-color-circle"
                  style={{ backgroundColor: color.toLowerCase().replace(/\s+/g, '') }}
                  title={color}
                ></span>
              ))} */}
            </div>
            
            {product.fabric && <div className='product-details-product-fabric'>
              <strong>Fabric: </strong>
              <span>{product.fabric}</span>

            </div>
            }

            {product?.subCategory === "Ready to Wear" && (
              <div className="product-details-product-sizes">
                <strong>Sizes:</strong>

                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className={`product-details-size-badge ${selectedSize === size ? "product-details-size-badge-selected" : ""
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}

          </div>


          <div className="product-description">
            <b>Additional Details:</b>
            <p>{product.details}</p>
          </div>

          <div className="product-description">
            <b> Description:</b>
            <p>{product.description}</p>
          </div>

          <div className="product-actions-group">
            {/* <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input

                  readOnly
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
            </div> */}

            <div className="action-buttons">

              {product?.stock <= 0 ?
                <button
                  className="btn btn-primary btn-large"
                >
                  Out of Stock
                </button>
                :
                <button
                  className="btn btn-primary btn-large"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>}

            </div>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <strong>Product Code:</strong> {product.productId}
            </div>
            <div className="meta-item">
              <strong>Fabric:</strong> {product.fabric}
            </div>
            <div className="meta-item">
              {product.stock <= 0 ?
                <>
                  <strong>Availability:</strong> <span className="out-stock">Out of Stock</span></>
                :
                <><strong>Availability:</strong> <span className="in-stock">In Stock</span></>}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">


          <section>
            <ScrollableCategoryCarousel
              header="Related Products"
              images={relatedProducts}
              headerStyle={{ color: '#333' }}
              onAddToCart={onAddToCart}
            />
          </section>

        </div>
      )}
    </div>
  )
}

export default ProductDetails
