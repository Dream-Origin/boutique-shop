import "./ProductSkeleton.css";

export default function ProductSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="skeleton skeleton-img"></div>

      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-price"></div>
    </div>
  );
}
