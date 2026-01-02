import { useState } from "react";
import './ProductImageZoom.css';

const ProductImageZoom = ({ src, alt, badge }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div className="product-details-image">
        {src && (
          <img
            src={src}
            alt={alt}
            onClick={() => setIsOpen(true)}
            className="zoomable-image"
          />
        )}
        {badge && <span className="product-badge">{badge}</span>}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isOpen && (
        <div className="image-zoom-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="image-zoom-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>

            <img src={src} alt={alt} className="zoomed-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageZoom;
