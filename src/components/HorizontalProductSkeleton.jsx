import "./HorizontalProductSkeleton.css";

export default function HorizontalProductSkeleton() {
  return (
    <div className="hp-skeleton">
      <div className="skeleton hp-img"></div>

      <div className="skeleton hp-text short"></div>
      <div className="skeleton hp-text"></div>
    </div>
  );
}
